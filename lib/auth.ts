/**
 * Custom Simple Authentication System
 * Koristi localStorage za session management
 */

export interface User {
  id: string
  email: string
  name?: string
  createdAt: string
}

export interface AuthError {
  message: string
  status: number
}

// Mock email sending - u produkciji bi se koristio pravi email servis
const mockEmailService = {
  sendOTP: async (email: string, code: string): Promise<void> => {
    // Simuliramo email slanje
    console.log(`📧 OTP kod poslan na ${email}: ${code}`)
    
    // U produkciji bi se ovdje slao pravi email
    // await sendEmail({
    //   to: email,
    //   subject: 'Verifikacijski kod - Rečenice Strasti',
    //   body: `Vaš verifikacijski kod je: ${code}`
    // })
  }
}

// Storage keys
const STORAGE_KEYS = {
  SESSION: 'recenice_strasti_session',
  OTP: 'recenice_strasti_otp',
  USER: 'recenice_strasti_user'
}

/**
 * Generiraj 6-znamenkasti OTP kod
 */
function generateOTP(): string {
  return Math.floor(100000 + Math.random() * 900000).toString()
}

/**
 * Provjeri da li je korisnik prijavljen
 */
export function isAuthenticated(): boolean {
  if (typeof window === 'undefined') return false
  
  const session = localStorage.getItem(STORAGE_KEYS.SESSION)
  if (!session) return false
  
  try {
    const sessionData = JSON.parse(session)
    const now = new Date().getTime()
    
    // Provjeri da li je session istekao (24 sata)
    if (now > sessionData.expiresAt) {
      localStorage.removeItem(STORAGE_KEYS.SESSION)
      localStorage.removeItem(STORAGE_KEYS.USER)
      return false
    }
    
    return true
  } catch {
    localStorage.removeItem(STORAGE_KEYS.SESSION)
    localStorage.removeItem(STORAGE_KEYS.USER)
    return false
  }
}

/**
 * Dohvati trenutnog korisnika
 */
export function getCurrentUser(): User | null {
  if (typeof window === 'undefined') return null
  if (!isAuthenticated()) return null
  
  try {
    const userData = localStorage.getItem(STORAGE_KEYS.USER)
    return userData ? JSON.parse(userData) : null
  } catch {
    return null
  }
}

/**
 * Pošalji OTP kod na email
 */
export async function sendOTP(email: string): Promise<{ error: AuthError | null }> {
  try {
    // Validacija email-a
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return {
        error: {
          message: 'Neispravna email adresa',
          status: 400
        }
      }
    }

    // Generiraj OTP kod
    const code = generateOTP()
    
    // Spremi OTP kod u localStorage (5 minuta važi)
    const otpData = {
      email,
      code,
      expiresAt: new Date().getTime() + (5 * 60 * 1000) // 5 minuta
    }
    
    localStorage.setItem(STORAGE_KEYS.OTP, JSON.stringify(otpData))
    
    // Pošalji email (mock)
    await mockEmailService.sendOTP(email, code)
    
    return { error: null }
  } catch {
    return {
      error: {
        message: 'Neočekivana greška pri slanju koda',
        status: 500
      }
    }
  }
}

/**
 * Verificiraj OTP kod
 */
export async function verifyOTP(email: string, code: string): Promise<{ 
  user: User | null
  error: AuthError | null 
}> {
  try {
    if (typeof window === 'undefined') {
      return {
        user: null,
        error: {
          message: 'Funkcija dostupna samo u browseru',
          status: 400
        }
      }
    }

    // Dohvati spremljeni OTP
    const otpData = localStorage.getItem(STORAGE_KEYS.OTP)
    if (!otpData) {
      return {
        user: null,
        error: {
          message: 'OTP kod nije pronađen. Molimo zatražite novi kod.',
          status: 400
        }
      }
    }

    try {
      const parsedOtp = JSON.parse(otpData)
      
      // Provjeri da li je kod istekao
      if (new Date().getTime() > parsedOtp.expiresAt) {
        localStorage.removeItem(STORAGE_KEYS.OTP)
        return {
          user: null,
          error: {
            message: 'OTP kod je istekao. Molimo zatražite novi kod.',
            status: 400
          }
        }
      }

      // Provjeri email i kod
      if (parsedOtp.email !== email || parsedOtp.code !== code) {
        return {
          user: null,
          error: {
            message: 'Neispravan kod',
            status: 400
          }
        }
      }

      // Kreiraj korisnika
      const user: User = {
        id: `user_${Date.now()}`,
        email,
        name: email.split('@')[0],
        createdAt: new Date().toISOString()
      }

      // Spremi korisnika
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user))

      // Kreiraj session (24 sata važi)
      const sessionData = {
        userId: user.id,
        email: user.email,
        createdAt: new Date().toISOString(),
        expiresAt: new Date().getTime() + (24 * 60 * 60 * 1000) // 24 sata
      }
      
      localStorage.setItem(STORAGE_KEYS.SESSION, JSON.stringify(sessionData))
      
      // Obriši OTP kod
      localStorage.removeItem(STORAGE_KEYS.OTP)

      return { user, error: null }
    } catch {
      localStorage.removeItem(STORAGE_KEYS.OTP)
      return {
        user: null,
        error: {
          message: 'Neispravni OTP podaci',
          status: 400
        }
      }
    }
  } catch {
    return {
      user: null,
      error: {
        message: 'Neočekivana greška pri verificiranju koda',
        status: 500
      }
    }
  }
}

/**
 * Odjavi korisnika
 */
export function signOut(): { error: AuthError | null } {
  try {
    if (typeof window === 'undefined') {
      return {
        error: {
          message: 'Funkcija dostupna samo u browseru',
          status: 400
        }
      }
    }

    localStorage.removeItem(STORAGE_KEYS.SESSION)
    localStorage.removeItem(STORAGE_KEYS.USER)
    localStorage.removeItem(STORAGE_KEYS.OTP)

    return { error: null }
  } catch {
    return {
      error: {
        message: 'Neočekivana greška pri odjavi',
        status: 500
      }
    }
  }
}

/**
 * Slušaj promjene auth stanja (mock - za kompatibilnost)
 */
export function onAuthStateChange(callback: (user: User | null) => void) {
  // U custom auth sistemu, ovo je jednostavnije
  // Možemo koristiti window events ili polling
  const checkAuth = () => {
    const user = getCurrentUser()
    callback(user)
  }

  // Provjeri odmah
  checkAuth()

  // Provjeri svakih 30 sekundi
  const interval = setInterval(checkAuth, 30000)

  // Vrati cleanup funkciju
  return {
    unsubscribe: () => clearInterval(interval)
  }
}
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

// Storage keys
const STORAGE_KEYS = {
  SESSION: 'recenice_strasti_session',
  USER: 'recenice_strasti_user'
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
 * Prijavi korisnika s emailom i imenom
 */
export async function loginWithEmail(email: string, name: string): Promise<{ 
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

    // Validacija email-a
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return {
        user: null,
        error: {
          message: 'Neispravna email adresa',
          status: 400
        }
      }
    }

    // Validacija imena
    if (!name || name.trim().length < 2) {
      return {
        user: null,
        error: {
          message: 'Ime mora imati najmanje 2 znaka',
          status: 400
        }
      }
    }

    // Kreiraj korisnika
    const user: User = {
      id: `user_${Date.now()}`,
      email: email.trim(),
      name: name.trim(),
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

    return { user, error: null }
  } catch {
    return {
      user: null,
      error: {
        message: 'Neočekivana greška pri prijavi',
        status: 500
      }
    }
  }
}

// OTP funkcije uklonjene - koristimo jednostavan login

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
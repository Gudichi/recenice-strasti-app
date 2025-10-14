import { getSupabaseClient } from './supabase'

export interface AuthUser {
  id: string
  email: string
  created_at: string
}

export interface AuthError {
  message: string
  status?: number
}

/**
 * Pošalji OTP kod na email
 */
export async function sendOTP(email: string): Promise<{ error: AuthError | null }> {
  try {
    const supabase = getSupabaseClient()
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        shouldCreateUser: true,
      }
    })

    if (error) {
      return {
        error: {
          message: error.message,
          status: error.status
        }
      }
    }

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
export async function verifyOTP(email: string, token: string): Promise<{ 
  user: AuthUser | null
  error: AuthError | null 
}> {
  try {
    const supabase = getSupabaseClient()
    const { data, error } = await supabase.auth.verifyOtp({
      email,
      token,
      type: 'email'
    })

    if (error) {
      return {
        user: null,
        error: {
          message: error.message,
          status: error.status
        }
      }
    }

    if (!data.user) {
      return {
        user: null,
        error: {
          message: 'Korisnik nije pronađen',
          status: 404
        }
      }
    }

    return {
      user: {
        id: data.user.id,
        email: data.user.email!,
        created_at: data.user.created_at
      },
      error: null
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
 * Dohvati trenutnog korisnika
 */
export async function getCurrentUser(): Promise<{
  user: AuthUser | null
  error: AuthError | null
}> {
  try {
    const supabase = getSupabaseClient()
    const { data: { user }, error } = await supabase.auth.getUser()

    if (error) {
      return {
        user: null,
        error: {
          message: error.message,
          status: error.status
        }
      }
    }

    if (!user) {
      return {
        user: null,
        error: null
      }
    }

    return {
      user: {
        id: user.id,
        email: user.email!,
        created_at: user.created_at
      },
      error: null
    }
  } catch {
    return {
      user: null,
      error: {
        message: 'Neočekivana greška pri dohvaćanju korisnika',
        status: 500
      }
    }
  }
}

/**
 * Odjavi korisnika
 */
export async function signOut(): Promise<{ error: AuthError | null }> {
  try {
    const supabase = getSupabaseClient()
    const { error } = await supabase.auth.signOut()

    if (error) {
      return {
        error: {
          message: error.message,
          status: error.status
        }
      }
    }

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
 * Slušaj promjene auth stanja
 */
export function onAuthStateChange(callback: (user: AuthUser | null) => void) {
  const supabase = getSupabaseClient()
  return supabase.auth.onAuthStateChange((event, session) => {
    if (session?.user) {
      callback({
        id: session.user.id,
        email: session.user.email!,
        created_at: session.user.created_at
      })
    } else {
      callback(null)
    }
  })
}

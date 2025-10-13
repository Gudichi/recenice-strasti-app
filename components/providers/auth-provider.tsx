'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { AuthUser, getCurrentUser, onAuthStateChange } from '@/lib/auth'

interface AuthContextType {
  user: AuthUser | null
  loading: boolean
  error: string | null
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  error: null
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Provjeri postojeću sesiju
    getCurrentUser().then(({ user, error }) => {
      if (error) {
        setError(error.message)
      } else {
        setUser(user)
      }
      setLoading(false)
    })

    // Slušaj promjene auth stanja
    const { data: { subscription } } = onAuthStateChange((user) => {
      setUser(user)
      setLoading(false)
      setError(null)
    })

    return () => subscription.unsubscribe()
  }, [])

  return (
    <AuthContext.Provider value={{ user, loading, error }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

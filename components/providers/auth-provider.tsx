'use client'

import React, { createContext, useContext, useState, useEffect, useMemo, ReactNode } from 'react'
import { getCurrentUser, onAuthStateChange, User } from '@/lib/auth'

interface AuthContextType {
  user: User | null
  loading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Dohvati trenutnog korisnika
    const currentUser = getCurrentUser()
    setUser(currentUser)
    setLoading(false)

    // Slušaj promjene auth stanja
    const { unsubscribe } = onAuthStateChange((newUser) => {
      setUser(newUser)
      setLoading(false)
    })

    return () => {
      unsubscribe()
    }
  }, [])

  const contextValue = useMemo(() => ({ user, loading }), [user, loading])

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

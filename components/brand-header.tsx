'use client'

import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Container } from '@/components/ui/container'
import { useAuth } from '@/components/providers/auth-provider'
import { signOut } from '@/lib/auth'
import { useRouter } from 'next/navigation'

export function BrandHeader() {
  const { user, loading } = useAuth()
  const router = useRouter()

  const handleLogout = async () => {
    const { error } = await signOut()
    if (!error) {
      router.push('/login')
    }
  }

  const getUserInitials = (email: string) => {
    return email.split('@')[0].substring(0, 2).toUpperCase()
  }

  if (loading) {
    return (
      <header className="bg-white/90 backdrop-blur-md sticky top-0 z-50 shadow-sm">
        <Container>
          <div className="flex items-center justify-between py-5 lg:py-6">
            <div className="flex items-center space-x-4 lg:space-x-6">
              <div className="w-12 h-12 lg:w-14 lg:h-14 bg-gradient-to-br from-brand-primary to-brand-secondary rounded-full flex items-center justify-center shadow-lg">
                <span className="text-white font-display text-2xl lg:text-3xl font-bold">R</span>
              </div>
              <h1 className="font-display text-3xl lg:text-4xl xl:text-5xl text-brand-accent font-semibold tracking-tight">
                Rečenice Strasti
              </h1>
            </div>
            <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gray-200 rounded-full animate-pulse"></div>
          </div>
        </Container>
        <div className="h-px bg-gradient-to-r from-transparent via-brand-secondary/50 to-transparent"></div>
      </header>
    )
  }

  if (!user) {
    return null // Ne prikazuj header ako korisnik nije prijavljen
  }

  return (
    <header className="bg-white/90 backdrop-blur-md sticky top-0 z-50 shadow-sm">
      <Container>
        <div className="flex items-center justify-between py-5 lg:py-6">
          {/* Logo */}
          <div className="flex items-center space-x-4 lg:space-x-6">
            <div className="w-12 h-12 lg:w-14 lg:h-14 bg-gradient-to-br from-brand-primary to-brand-secondary rounded-full flex items-center justify-center shadow-lg">
              <span className="text-white font-display text-2xl lg:text-3xl font-bold">R</span>
            </div>
            <h1 className="font-display text-3xl lg:text-4xl xl:text-5xl text-brand-accent font-semibold tracking-tight">
              Rečenice Strasti
            </h1>
          </div>
          
          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="cursor-pointer ring-2 ring-brand-secondary/30 hover:ring-brand-primary/50 transition-all duration-300 hover:scale-105 w-10 h-10 lg:w-12 lg:h-12">
                <AvatarFallback className="bg-gradient-to-br from-brand-secondary to-brand-primary text-white font-semibold text-lg lg:text-xl">
                  {getUserInitials(user.email)}
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48 bg-white/95 backdrop-blur-sm border-brand-primary/20 shadow-xl">
              <DropdownMenuItem 
                className="text-gray-700 hover:text-brand-accent hover:bg-brand-secondary/10 transition-colors duration-200"
                onClick={handleLogout}
              >
                Odjava
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </Container>
      
      {/* Gradient Divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-brand-secondary/50 to-transparent"></div>
    </header>
  )
}

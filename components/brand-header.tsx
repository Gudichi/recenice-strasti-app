'use client'

import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Container } from '@/components/ui/container'

export function BrandHeader() {
  return (
    <header className="bg-white/90 backdrop-blur-md sticky top-0 z-50 shadow-sm">
      <Container>
        <div className="flex items-center justify-between py-5">
          {/* Logo */}
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-br from-brand-primary to-brand-secondary rounded-full flex items-center justify-center shadow-lg">
              <span className="text-white font-display text-2xl font-bold">R</span>
            </div>
            <h1 className="font-display text-3xl text-brand-accent font-semibold tracking-tight">
              Rečenice Strasti
            </h1>
          </div>
          
          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="cursor-pointer ring-2 ring-brand-secondary/30 hover:ring-brand-primary/50 transition-all duration-300 hover:scale-105">
                <AvatarFallback className="bg-gradient-to-br from-brand-secondary to-brand-primary text-white font-semibold text-lg">
                  KG
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48 bg-white/95 backdrop-blur-sm border-brand-primary/20 shadow-xl">
              <DropdownMenuItem 
                className="text-gray-700 hover:text-brand-accent hover:bg-brand-secondary/10 transition-colors duration-200"
                onClick={() => {
                  // TODO: Implement logout logic
                  console.log('Logout clicked')
                }}
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

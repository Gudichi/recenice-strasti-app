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
    <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
      <Container>
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-brand-primary to-brand-secondary rounded-full flex items-center justify-center">
              <span className="text-white font-display text-xl font-bold">R</span>
            </div>
            <h1 className="font-display text-2xl text-brand-accent font-semibold">
              Rečenice Strasti
            </h1>
          </div>
          
          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="cursor-pointer ring-2 ring-brand-secondary/20 hover:ring-brand-primary/40 transition-all duration-200">
                <AvatarFallback className="bg-brand-secondary text-brand-accent font-semibold">
                  KG
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem 
                className="text-gray-700 hover:text-brand-accent hover:bg-brand-secondary/10"
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
    </header>
  )
}

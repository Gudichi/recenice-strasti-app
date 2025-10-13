'use client'

import { CTAButton } from '@/components/ui/cta-button'
import { Card, CardContent, CardDescription, CardHeader } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { SectionTitle } from '@/components/ui/section-title'
import { useRouter } from 'next/navigation'
import { useState, Suspense } from 'react'

function WelcomeContent() {
  const router = useRouter()
  const [code, setCode] = useState('')
  const email = 'vas@email.com' // TODO: Get from search params

  const handleVerifyCode = () => {
    if (code) {
      // TODO: Implement actual code verification
      console.log('Verifying code:', code)
      router.push('/')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-bg via-white to-brand-secondary/5 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-white/80 backdrop-blur-sm border-brand-primary/20 shadow-xl">
        <CardHeader className="text-center pb-6">
          <SectionTitle as="h1" className="text-3xl mb-4" showUnderline={false}>
            Dobrodošla!
          </SectionTitle>
          <CardDescription className="text-gray-600 text-base">
            Poslali smo ti kod na <strong className="text-brand-accent">{email}</strong>
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-sm text-gray-600 text-center">
            Unesi verifikacijski kod za ulaz u program Rečenice Strasti
          </p>
          
          <div className="space-y-2">
            <label htmlFor="code" className="block text-sm font-medium text-gray-700">
              Verifikacijski kod
            </label>
            <Input
              id="code"
              type="text"
              placeholder="123456"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="h-12 text-base border-gray-300 focus:border-brand-cta focus:ring-brand-cta/20 text-center tracking-widest"
            />
          </div>
          
          <CTAButton 
            onClick={handleVerifyCode}
            className="w-full"
            disabled={!code}
            size="lg"
          >
            Potvrdi kod
          </CTAButton>
          
          <div className="text-center">
            <CTAButton 
              variant="link" 
              onClick={() => router.push('/login')}
              className="text-sm"
            >
              Promijeni email adresu
            </CTAButton>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default function WelcomePage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-brand-bg flex items-center justify-center">Loading...</div>}>
      <WelcomeContent />
    </Suspense>
  )
}

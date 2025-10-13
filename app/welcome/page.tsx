'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
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
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Dobrodošli!</CardTitle>
          <CardDescription>
            Poslali smo ti kod na <strong>{email}</strong>
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground text-center">
            Unesi kod za ulaz u program Rečenice Strasti
          </p>
          
          <div>
            <label htmlFor="code" className="block text-sm font-medium mb-2">
              Verifikacijski kod
            </label>
            <Input
              id="code"
              type="text"
              placeholder="123456"
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
          </div>
          
          <Button 
            onClick={handleVerifyCode}
            className="w-full"
            disabled={!code}
          >
            Potvrdi kod
          </Button>
          
          <div className="text-center">
            <Button 
              variant="link" 
              onClick={() => router.push('/login')}
              className="text-sm"
            >
              Promijeni email adresu
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default function WelcomePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <WelcomeContent />
    </Suspense>
  )
}

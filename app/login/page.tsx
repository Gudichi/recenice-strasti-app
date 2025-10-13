'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [code, setCode] = useState('')
  const [step, setStep] = useState<'email' | 'code'>('email')
  const router = useRouter()

  const handleSendCode = () => {
    if (email) {
      // TODO: Implement actual email sending
      console.log('Sending code to:', email)
      setStep('code')
    }
  }

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
          <CardTitle className="text-2xl">Prijava</CardTitle>
          <CardDescription>
            {step === 'email' 
              ? 'Unesite svoju email adresu za prijavu'
              : 'Unesite kod koji ste primili'
            }
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {step === 'email' ? (
            <>
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Email adresa
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="vas@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <Button 
                onClick={handleSendCode}
                className="w-full"
                disabled={!email}
              >
                Pošalji kod
              </Button>
            </>
          ) : (
            <>
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
              <div className="flex gap-2">
                <Button 
                  variant="outline"
                  onClick={() => setStep('email')}
                  className="flex-1"
                >
                  Nazad
                </Button>
                <Button 
                  onClick={handleVerifyCode}
                  className="flex-1"
                  disabled={!code}
                >
                  Potvrdi
                </Button>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

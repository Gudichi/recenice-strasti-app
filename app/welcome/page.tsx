'use client'

import { CTAButton } from '@/components/ui/cta-button'
import { Card, CardContent, CardDescription, CardHeader } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { SectionTitle } from '@/components/ui/section-title'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState, Suspense, useEffect } from 'react'
import { verifyOTP } from '@/lib/auth'

function WelcomeContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [code, setCode] = useState('')
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  useEffect(() => {
    // Extract email from URL params if available
    const emailParam = searchParams.get('email')
    if (emailParam) {
      setEmail(emailParam)
    }

    // Check if we have access_token in URL (from magic link)
    const hash = window.location.hash
    if (hash.includes('access_token')) {
      // Magic link authentication - redirect to dashboard
      router.push('/')
    }
  }, [searchParams, router])

  const handleVerifyCode = async () => {
    if (!code || !email) {
      setError('Molimo unesite kod i email')
      return
    }

    setLoading(true)
    setError(null)

    const { user, error } = await verifyOTP(email, code)
    
    if (error) {
      setError(error.message)
    } else if (user) {
      setSuccess('Uspješno ste se prijavili!')
      // Redirect to dashboard with full page reload to ensure session is picked up by middleware
      window.location.href = '/'
    }
    
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-bg via-white to-brand-secondary/5 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-white/80 backdrop-blur-sm border-brand-primary/20 shadow-xl">
        <CardHeader className="text-center pb-6">
          <SectionTitle as="h1" className="text-3xl mb-4" showUnderline={false}>
            Dobrodošla!
          </SectionTitle>
          <CardDescription className="text-gray-600 text-base">
            {email ? `Poslali smo ti kod na ${email}` : 'Unesi email i verifikacijski kod'}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-sm text-gray-600 text-center">
            Unesi verifikacijski kod za ulaz u program Rečenice Strasti
          </p>
          
          {!email && (
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email adresa
              </label>
              <Input
                id="email"
                type="email"
                placeholder="vas@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-12 text-base border-gray-300 focus:border-brand-cta focus:ring-brand-cta/20"
              />
            </div>
          )}
          
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

          {error && (
            <div className="text-red-600 text-sm bg-red-50 p-3 rounded-lg border border-red-200">
              {error}
            </div>
          )}

          {success && (
            <div className="text-green-600 text-sm bg-green-50 p-3 rounded-lg border border-green-200">
              {success}
            </div>
          )}
          
          <CTAButton 
            onClick={handleVerifyCode}
            disabled={loading || !code || !email}
            className="w-full"
            size="lg"
          >
            {loading ? 'Provjerava...' : 'Potvrdi kod'}
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

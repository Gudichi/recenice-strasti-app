'use client'

import { CTAButton } from '@/components/ui/cta-button'
import { Card, CardContent, CardDescription, CardHeader } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { SectionTitle } from '@/components/ui/section-title'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { sendOTP, verifyOTP } from '@/lib/auth'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [code, setCode] = useState('')
  const [step, setStep] = useState<'email' | 'code'>('email')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const router = useRouter()

  const handleSendCode = async () => {
    if (!email) {
      setError('Molimo unesite email adresu')
      return
    }

    setLoading(true)
    setError(null)
    setSuccess(null)

    const { error } = await sendOTP(email)
    
    if (error) {
      setError(error.message)
    } else {
      setSuccess('Kod je poslan na vašu email adresu')
      setStep('code')
    }
    
    setLoading(false)
  }

  const handleVerifyCode = async () => {
    if (!code || !email) {
      setError('Molimo unesite kod')
      return
    }

    setLoading(true)
    setError(null)

    const { user, error } = await verifyOTP(email, code)
    
    if (error) {
      setError(error.message)
    } else if (user) {
      setSuccess('Uspješno ste se prijavili!')
      // Redirect to dashboard
      setTimeout(() => {
        router.push('/')
      }, 1000)
    }
    
    setLoading(false)
  }

  const handleBackToEmail = () => {
    setStep('email')
    setCode('')
    setError(null)
    setSuccess(null)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-bg via-white to-brand-secondary/5">
      <div className="container mx-auto px-4 py-16 lg:px-8 lg:py-24">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Form */}
            <div className="order-2 lg:order-1">
              <Card className="max-w-md mx-auto lg:mx-0 bg-white/80 backdrop-blur-sm border-brand-primary/20 shadow-xl">
                <CardHeader className="text-center pb-6">
                  <SectionTitle as="h1" className="text-3xl mb-4" showUnderline={false}>
                    Prijavi se
                  </SectionTitle>
                  <CardDescription className="text-gray-600 text-base">
                    {step === 'email' 
                      ? 'Unesite svoju email adresu za sigurnu prijavu'
                      : 'Unesite verifikacijski kod koji smo poslali'
                    }
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {step === 'email' ? (
                    <>
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
                        onClick={handleSendCode}
                        className="w-full"
                        disabled={!email || loading}
                        size="lg"
                      >
                        {loading ? 'Šalje se...' : 'Pošalji kod'}
                      </CTAButton>
                    </>
                  ) : (
                    <>
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
                      <div className="flex gap-3">
                        <CTAButton 
                          variant="outline"
                          onClick={handleBackToEmail}
                          className="flex-1"
                          disabled={loading}
                          size="lg"
                        >
                          Nazad
                        </CTAButton>
                        <CTAButton 
                          onClick={handleVerifyCode}
                          className="flex-1"
                          disabled={!code || loading}
                          size="lg"
                        >
                          {loading ? 'Provjerava...' : 'Potvrdi'}
                        </CTAButton>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Right Side - Visual */}
            <div className="order-1 lg:order-2">
              <div className="text-center lg:text-left">
                <h2 className="font-display text-4xl lg:text-5xl text-brand-accent mb-6">
                  Dobrodošla u <span className="text-brand-primary">Rečenice Strasti</span>
                </h2>
                <p className="text-xl text-gray-600 leading-relaxed mb-8">
                  Otkrij snagu riječi u intimnosti i transformiraj svoju vezu kroz sofisticirane komunikacijske tehnike.
                </p>
                
                {/* Placeholder for lifestyle image */}
                <div className="bg-gradient-to-br from-brand-primary/20 to-brand-secondary/20 rounded-2xl p-8 lg:p-12">
                  <div className="w-32 h-32 mx-auto lg:mx-0 bg-white/50 rounded-full flex items-center justify-center mb-6">
                    <svg className="w-16 h-16 text-brand-primary" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="text-gray-600 font-medium">
                    &ldquo;Riječi su most između dva srca&rdquo;
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

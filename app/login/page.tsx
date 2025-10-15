'use client'

import { CTAButton } from '@/components/ui/cta-button'
import { Card, CardContent, CardDescription, CardHeader } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { SectionTitle } from '@/components/ui/section-title'
import { useState } from 'react'
import { loginWithEmail } from '@/lib/auth'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  const handleLogin = async () => {
    if (!email || !name) {
      setError('Molimo unesite email adresu i ime')
      return
    }

    setLoading(true)
    setError(null)
    setSuccess(null)

    const { user, error } = await loginWithEmail(email, name)
    
    if (error) {
      setError(error.message)
    } else if (user) {
      setSuccess('Uspješno ste se prijavili!')
      // Redirect to dashboard
      setTimeout(() => {
        window.location.href = '/'
      }, 1000)
    }
    
    setLoading(false)
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
                  <SectionTitle as="h1" className="text-3xl mb-4 text-[#2C2C2C]" showUnderline={false}>
                    Prijavi se
                  </SectionTitle>
                  <CardDescription className="text-[#2C2C2C] text-base">
                    Unesite svoju email adresu i ime za pristup programu
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="block text-sm font-medium text-[#2C2C2C]">
                      Vaše ime
                    </label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="Vaše ime"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="h-12 text-base border-[#F5E5E0] focus:border-[#FFDAB9] focus:ring-[#FFDAB9]/20"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="email" className="block text-sm font-medium text-[#2C2C2C]">
                      Email adresa
                    </label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="vas@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="h-12 text-base border-[#F5E5E0] focus:border-[#FFDAB9] focus:ring-[#FFDAB9]/20"
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
                    onClick={handleLogin}
                    className="w-full"
                    disabled={!email || !name || loading}
                    size="lg"
                  >
                    {loading ? 'Prijavljuje se...' : 'Prijavi se'}
                  </CTAButton>
                </CardContent>
              </Card>
            </div>

            {/* Right Side - Visual */}
            <div className="order-1 lg:order-2 text-center lg:text-left">
              <h2 className="font-display text-4xl lg:text-5xl text-[#2C2C2C] leading-tight mb-6">
                Dobrodošla u <span className="text-[#FF6B9D]">Rečenice Strasti</span>
              </h2>
              <p className="text-lg lg:text-xl text-[#2C2C2C] max-w-lg mx-auto lg:mx-0 leading-relaxed mb-8">
                Otkrij snagu riječi u intimnosti i transformiraj svoju vezu kroz sofisticirane komunikacijske tehnike.
              </p>
              <div className="text-[#FF6B9D] text-4xl mb-6">💞</div>
              <p className="font-display text-2xl lg:text-3xl text-[#2C2C2C] italic max-w-lg mx-auto lg:mx-0">
                &ldquo;Riječi su most između dva srca&rdquo;
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
'use client'

import { BrandHeader } from '@/components/brand-header'
import { Container } from '@/components/ui/container'
import { SectionTitle } from '@/components/ui/section-title'
import { ProgressBar } from '@/components/ui/progress-bar'
import { CTAButton } from '@/components/ui/cta-button'
import { ModuleCard } from '@/components/ui/module-card'
import { Card, CardContent } from '@/components/ui/card'
import { useAuth } from '@/components/providers/auth-provider'
import { useEffect } from 'react'
import Link from 'next/link'
import { getAllModules, routes } from '@/lib/content'

export default function Dashboard() {
  const { user, loading } = useAuth()

  useEffect(() => {
    // Redirect to login if not authenticated
    if (!loading && !user) {
      window.location.href = '/login'
    }
  }, [user, loading])

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-brand-bg flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-brand-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Učitavanje...</p>
        </div>
      </div>
    )
  }

  // Don't render if not authenticated
  if (!user) {
    return null
  }
  const modules = getAllModules()
  const userProgress = 42 // TODO: Get from user data

  return (
    <div className="min-h-screen bg-brand-bg">
      <BrandHeader />
      
      <main className="py-16 lg:py-24">
        <Container maxWidth="6xl">
          {/* Hero Card */}
          <Card className="mb-20 bg-gradient-to-br from-brand-bg via-white to-brand-secondary/8 border-brand-primary/10 shadow-xl overflow-hidden">
            <CardContent className="p-12 lg:p-16 text-center relative">
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-5">
                <div className="absolute top-10 right-10 w-32 h-32 bg-brand-primary rounded-full blur-3xl"></div>
                <div className="absolute bottom-10 left-10 w-24 h-24 bg-brand-secondary rounded-full blur-2xl"></div>
              </div>
              
              <div className="relative z-10">
                    <h1 className="font-display text-5xl lg:text-6xl text-brand-accent mb-6 leading-tight">
                      Dobrodošla, <span className="text-brand-primary">{user?.name || 'Korisnice'}</span>
                    </h1>
                <p className="text-xl lg:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-10">
                  Nastavi svoje putovanje kroz program Rečenice Strasti i otkrij snagu riječi u intimnosti
                </p>
                
                <CTAButton asChild size="xl" className="shadow-lg hover:shadow-xl">
                  <Link href={routes.lesson('modul-1', 'lekcija-2')}>
                    Nastavi gdje si stala →
                  </Link>
                </CTAButton>
              </div>
            </CardContent>
          </Card>

          {/* Progress Card */}
          <Card className="mb-20 bg-white/80 backdrop-blur-sm border-brand-primary/20 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-8 lg:p-10">
              <div className="text-center mb-8">
                <h2 className="font-display text-3xl lg:text-4xl text-brand-accent mb-3">
                  Vaš napredak
                </h2>
                <p className="text-lg text-gray-600">
                  Uspješno ste završili {userProgress}% programa
                </p>
              </div>
              
              <ProgressBar 
                value={userProgress} 
                size="lg"
                className="mb-8"
              />
              
              <p className="text-center text-brand-primary font-medium text-lg">
                💞 Svaka rečenica te vodi dublje u povezanost
              </p>
            </CardContent>
          </Card>

          {/* Current Lesson Card */}
          <Card className="mb-20 border-brand-primary/30 bg-gradient-to-r from-brand-secondary/5 to-brand-primary/5 hover:shadow-lg transition-all duration-300">
            <CardContent className="p-8 lg:p-10">
              <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-brand-primary/10 rounded-2xl flex items-center justify-center">
                    <span className="text-2xl">📖</span>
                  </div>
                  <div>
                    <h3 className="font-display text-2xl lg:text-3xl text-brand-accent mb-2">
                      Lekcija na kojoj si stala
                    </h3>
                    <p className="text-gray-600 text-lg">
                      1.2 Snaga Riječi u Intimnosti
                    </p>
                  </div>
                </div>
                <CTAButton asChild variant="secondary" size="lg" className="shadow-md">
                  <Link href={routes.lesson('modul-1', 'lekcija-2')}>
                    Nastavi lekciju
                  </Link>
                </CTAButton>
              </div>
            </CardContent>
          </Card>

          {/* Modules Section */}
          <div className="mb-8">
            <SectionTitle as="h2" className="text-center mb-16 lg:mb-20">
              Rečenice Strasti program
            </SectionTitle>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-8 lg:gap-10">
              {modules.map((module, index) => (
                <ModuleCard
                  key={module.slug}
                  title={`${index + 1}. ${module.title}`}
                  description={module.description}
                  href={routes.module(module.slug)}
                  badge={`MODUL ${index + 1}`}
                  lessonCount={module.lessons.length}
                  isCompleted={index === 0} // First module completed for demo
                />
              ))}
              
              {/* Bonus Modules */}
              <ModuleCard
                title="Bonus: Napredne Tehnike"
                description="Sofisticirane metode za duboke povezanosti i transformaciju intimnosti"
                href="#"
                badge="BONUS"
                isBonus
                lessonCount={5}
              />
              
              <ModuleCard
                title="Bonus: Q&A Sessije"
                description="Mjesečne sesije gdje dobivaš odgovore na svoja pitanja direktno od stručnjaka"
                href="#"
                badge="BONUS"
                isBonus
                lessonCount={12}
              />
              
              <ModuleCard
                title="Bonus: Privatni Grupni Chat"
                description="Ekskluzivna zajednica gdje se povezuješ s drugim članovima programa"
                href="#"
                badge="BONUS"
                isBonus
                lessonCount={0}
              />
            </div>
          </div>
        </Container>
      </main>
    </div>
  )
}
import { BrandHeader } from '@/components/brand-header'
import { Container } from '@/components/ui/container'
import { SectionTitle } from '@/components/ui/section-title'
import { ProgressBar } from '@/components/ui/progress-bar'
import { CTAButton } from '@/components/ui/cta-button'
import { ModuleCard } from '@/components/ui/module-card'
import { Card, CardContent } from '@/components/ui/card'
import Link from 'next/link'
import { getAllModules, routes } from '@/lib/content'

export default function Dashboard() {
  const modules = getAllModules()
  const userProgress = 42 // TODO: Get from user data

  return (
    <div className="min-h-screen bg-brand-bg">
      <BrandHeader />
      
      <main className="py-12">
        <Container maxWidth="xl">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="font-display text-5xl lg:text-6xl text-brand-accent mb-6">
              Dobrodošla, <span className="text-brand-primary">Karlo</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Nastavi svoje putovanje kroz program Rečenice Strasti i otkrij snagu riječi u intimnosti
            </p>
          </div>

          {/* Progress Section */}
          <Card className="mb-16 bg-gradient-to-br from-white to-brand-secondary/5 border-brand-primary/20">
            <CardContent className="p-8">
              <div className="text-center mb-6">
                <h2 className="font-display text-3xl text-brand-accent mb-2">
                  Vaš napredak
                </h2>
                <p className="text-gray-600">
                  Uspješno ste završili {userProgress}% programa
                </p>
              </div>
              
              <ProgressBar 
                value={userProgress} 
                size="lg"
                className="mb-8"
              />
              
              <div className="text-center">
                <CTAButton asChild size="xl">
                  <Link href={routes.lesson('modul-1', 'lekcija-2')}>
                    Nastavi gdje si stala →
                  </Link>
                </CTAButton>
              </div>
            </CardContent>
          </Card>

          {/* Current Lesson Card */}
          <Card className="mb-16 border-brand-primary/30 bg-brand-secondary/5">
            <CardContent className="p-8">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-display text-2xl text-brand-accent mb-2">
                    Lekcija na kojoj si stala
                  </h3>
                  <p className="text-gray-600 text-lg">
                    1.2 Snaga Riječi u Intimnosti
                  </p>
                </div>
                <CTAButton asChild variant="secondary">
                  <Link href={routes.lesson('modul-1', 'lekcija-2')}>
                    Nastavi
                  </Link>
                </CTAButton>
              </div>
            </CardContent>
          </Card>

          {/* Modules Section */}
          <div className="mb-8">
            <SectionTitle as="h2" className="text-center mb-12">
              Rečenice Strasti program
            </SectionTitle>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
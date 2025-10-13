import { BrandHeader } from '@/components/brand-header'
import { BreadcrumbNav } from '@/components/breadcrumb-nav'
import { Container } from '@/components/ui/container'
import { SectionTitle } from '@/components/ui/section-title'
import { CTAButton } from '@/components/ui/cta-button'
import { LessonCard } from '@/components/ui/lesson-card'
import { Card, CardContent } from '@/components/ui/card'
import { getModule, routes } from '@/lib/content'
import Link from 'next/link'
import { notFound } from 'next/navigation'

interface ModulePageProps {
  params: Promise<{
    slug: string
  }>
}

export default async function ModulePage({ params }: ModulePageProps) {
  const { slug } = await params
  const moduleData = getModule(slug)
  
  if (!moduleData) {
    notFound()
  }

  const breadcrumbItems = [
    { label: moduleData.title }
  ]

  return (
    <div className="min-h-screen bg-brand-bg">
      <BrandHeader />
      
      <main className="py-12">
        <Container maxWidth="xl">
          <BreadcrumbNav items={breadcrumbItems} />
          
          {/* Module Header */}
          <Card className="mb-20 bg-gradient-to-br from-brand-bg via-white to-brand-secondary/8 border-brand-primary/10 shadow-xl overflow-hidden">
            <CardContent className="p-12 lg:p-16 text-center relative">
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-5">
                <div className="absolute top-8 right-8 w-24 h-24 bg-brand-primary rounded-full blur-2xl"></div>
                <div className="absolute bottom-8 left-8 w-20 h-20 bg-brand-secondary rounded-full blur-xl"></div>
              </div>
              
              <div className="relative z-10">
                <SectionTitle as="h1" className="text-4xl lg:text-6xl mb-8" showUnderline={false}>
                  {moduleData.title}
                </SectionTitle>
                <p className="text-xl lg:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-10">
                  {moduleData.description}
                </p>
                <CTAButton asChild size="xl" className="shadow-lg hover:shadow-xl">
                  <Link href={routes.lesson(slug, moduleData.lessons[0].slug)}>
                    Započni modul →
                  </Link>
                </CTAButton>
              </div>
            </CardContent>
          </Card>

          {/* Lessons Section */}
          <div className="space-y-12">
            <div className="text-center">
              <h2 className="font-display text-3xl lg:text-4xl text-brand-accent mb-6">
                Lekcije u ovom modulu
              </h2>
              <div className="w-32 h-1 bg-gradient-to-r from-brand-primary to-brand-secondary rounded-full mx-auto"></div>
            </div>
            
            <div className="grid gap-8 max-w-5xl mx-auto">
              {moduleData.lessons.map((lesson, index) => (
                <div 
                  key={lesson.slug}
                  className="transform transition-all duration-300 hover:scale-[1.02]"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <LessonCard
                    title={lesson.title}
                    description="Kliknite za početak lekcije"
                    href={routes.lesson(slug, lesson.slug)}
                    duration="15 min"
                    isCompleted={index === 0} // First lesson completed for demo
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Back to Program */}
          <div className="text-center mt-16">
            <CTAButton asChild variant="outline">
              <Link href={routes.home}>
                ← Natrag na program
              </Link>
            </CTAButton>
          </div>
        </Container>
      </main>
    </div>
  )
}

import { BrandHeader } from '@/components/brand-header'
import { BreadcrumbNav } from '@/components/breadcrumb-nav'
import { Container } from '@/components/ui/container'
import { SectionTitle } from '@/components/ui/section-title'
import { CTAButton } from '@/components/ui/cta-button'
import { LessonCard } from '@/components/ui/lesson-card'
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
          <div className="text-center mb-16">
            <SectionTitle as="h1" className="text-4xl lg:text-5xl mb-6">
              {moduleData.title}
            </SectionTitle>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
              {moduleData.description}
            </p>
            <CTAButton asChild size="xl">
              <Link href={routes.lesson(slug, moduleData.lessons[0].slug)}>
                Započni modul →
              </Link>
            </CTAButton>
          </div>

          {/* Lessons Section */}
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="font-display text-3xl text-brand-accent mb-4">
                Lekcije u ovom modulu
              </h2>
              <div className="w-24 h-1 bg-brand-secondary rounded-full mx-auto"></div>
            </div>
            
            <div className="grid gap-6 max-w-4xl mx-auto">
              {moduleData.lessons.map((lesson, index) => (
                <LessonCard
                  key={lesson.slug}
                  title={lesson.title}
                  description="Kliknite za početak lekcije"
                  href={routes.lesson(slug, lesson.slug)}
                  duration="15 min"
                  isCompleted={index === 0} // First lesson completed for demo
                />
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

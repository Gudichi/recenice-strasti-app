import { BrandHeader } from '@/components/brand-header'
import { BreadcrumbNav } from '@/components/breadcrumb-nav'
import { Container } from '@/components/ui/container'
import { CTAButton } from '@/components/ui/cta-button'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { getLesson, getModule, routes, getAllModules } from '@/lib/content'
import Link from 'next/link'
import { notFound } from 'next/navigation'

interface LessonPageProps {
  params: Promise<{
    module: string
    lesson: string
  }>
}

export default async function LessonPage({ params }: LessonPageProps) {
  const { module: moduleSlug, lesson: lessonSlug } = await params
  const lesson = getLesson(moduleSlug, lessonSlug)
  const moduleData = getModule(moduleSlug)
  const allModules = getAllModules()
  
  if (!lesson || !moduleData) {
    notFound()
  }

  // Find next lesson
  const currentModuleIndex = allModules.findIndex(m => m.slug === moduleSlug)
  const currentLessonIndex = moduleData.lessons.findIndex(l => l.slug === lessonSlug)
  
  let nextLessonHref: string | null = null
  let nextLessonText = 'Nazad na modul'
  
  if (currentLessonIndex < moduleData.lessons.length - 1) {
    // Next lesson in same module
    const nextLesson = moduleData.lessons[currentLessonIndex + 1]
    nextLessonHref = routes.lesson(moduleSlug, nextLesson.slug)
    nextLessonText = 'Prijeđi na sljedeću lekciju'
  } else if (currentModuleIndex < allModules.length - 1) {
    // First lesson of next module
    const nextModule = allModules[currentModuleIndex + 1]
    const firstLesson = nextModule.lessons[0]
    nextLessonHref = routes.lesson(nextModule.slug, firstLesson.slug)
    nextLessonText = 'Prijeđi na sljedeći modul'
  }

  const breadcrumbItems = [
    { label: moduleData.title, href: routes.module(moduleSlug) },
    { label: lesson.title }
  ]

  return (
    <div className="min-h-screen bg-brand-bg">
      <BrandHeader />
      
      <main className="py-12">
        <Container maxWidth="2xl">
          <BreadcrumbNav items={breadcrumbItems} />
          
          <Card className="bg-white/80 backdrop-blur-sm border-brand-primary/20 shadow-xl">
            <CardContent className="p-8 lg:p-12">
              {/* Lesson Header */}
              <div className="text-center mb-12">
                <h1 className="font-display text-4xl lg:text-5xl text-brand-accent mb-6">
                  {lesson.title}
                </h1>
                <div className="w-32 h-1 bg-brand-secondary rounded-full mx-auto"></div>
              </div>
              
              {/* Lesson Content */}
              <div className="prose prose-lg max-w-none">
                <div className="whitespace-pre-wrap text-gray-700 leading-relaxed space-y-6">
                  {lesson.content.split('\n\n').map((paragraph, index) => {
                    if (paragraph.startsWith('# ')) {
                      return (
                        <h2 key={index} className="font-display text-3xl text-brand-accent mt-12 mb-6">
                          {paragraph.replace('# ', '')}
                        </h2>
                      )
                    } else if (paragraph.startsWith('## ')) {
                      return (
                        <h3 key={index} className="font-semibold text-xl text-brand-primary mt-8 mb-4">
                          {paragraph.replace('## ', '')}
                        </h3>
                      )
                    } else if (paragraph.startsWith('- ')) {
                      const listItems = paragraph.split('\n- ').map(item => item.replace(/^-\s*/, ''))
                      return (
                        <ul key={index} className="list-disc list-inside space-y-2 text-gray-600">
                          {listItems.map((item, itemIndex) => (
                            <li key={itemIndex}>{item}</li>
                          ))}
                        </ul>
                      )
                    } else if (paragraph.trim()) {
                      return (
                        <p key={index} className="text-gray-700 leading-relaxed">
                          {paragraph}
                        </p>
                      )
                    }
                    return null
                  })}
                </div>
              </div>
              
              <Separator className="my-12" />
              
              {/* Navigation */}
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                <CTAButton asChild variant="outline">
                  <Link href={routes.module(moduleSlug)}>
                    ← Natrag na modul
                  </Link>
                </CTAButton>
                
                {nextLessonHref ? (
                  <CTAButton asChild size="xl">
                    <Link href={nextLessonHref}>
                      {nextLessonText} →
                    </Link>
                  </CTAButton>
                ) : (
                  <CTAButton asChild size="xl">
                    <Link href={routes.home}>
                      Završi program →
                    </Link>
                  </CTAButton>
                )}
              </div>
            </CardContent>
          </Card>
        </Container>
      </main>
    </div>
  )
}

import { BrandHeader } from '@/components/brand-header'
import { BreadcrumbNav } from '@/components/breadcrumb-nav'
import { Container } from '@/components/ui/container'
import { CTAButton } from '@/components/ui/cta-button'
import { Card, CardContent } from '@/components/ui/card'
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
          
          <Card className="bg-white/90 backdrop-blur-sm border-brand-primary/10 shadow-2xl overflow-hidden">
            <CardContent className="p-8 lg:p-16">
              {/* Lesson Header */}
              <div className="text-center mb-16 relative">
                <h1 className="font-display text-4xl lg:text-6xl text-brand-accent mb-8 leading-tight">
                  {lesson.title}
                </h1>
                <div className="w-40 h-1 bg-gradient-to-r from-brand-primary to-brand-secondary rounded-full mx-auto"></div>
                
                {/* Decorative Elements */}
                <div className="absolute -top-4 -left-4 w-8 h-8 bg-brand-secondary/20 rounded-full blur-sm"></div>
                <div className="absolute -bottom-2 -right-4 w-6 h-6 bg-brand-primary/20 rounded-full blur-sm"></div>
              </div>
              
              {/* Lesson Content */}
              <div className="prose prose-xl max-w-none">
                <div className="space-y-8">
                  {lesson.content.split('\n\n').map((paragraph, index) => {
                    if (paragraph.startsWith('# ')) {
                      return (
                        <div key={index} className="relative">
                          <h2 className="font-display text-3xl lg:text-4xl text-brand-accent mt-16 mb-8 leading-tight">
                            {paragraph.replace('# ', '')}
                          </h2>
                          <div className="w-16 h-0.5 bg-brand-secondary rounded-full"></div>
                        </div>
                      )
                    } else if (paragraph.startsWith('## ')) {
                      return (
                        <h3 key={index} className="font-semibold text-xl lg:text-2xl text-brand-primary mt-12 mb-6 leading-relaxed">
                          {paragraph.replace('## ', '')}
                        </h3>
                      )
                    } else if (paragraph.startsWith('- ')) {
                      const listItems = paragraph.split('\n- ').map(item => item.replace(/^-\s*/, ''))
                      return (
                        <div key={index} className="bg-gradient-to-r from-brand-secondary/5 to-brand-primary/5 p-6 rounded-2xl border-l-4 border-brand-primary">
                          <ul className="space-y-3 text-gray-700">
                            {listItems.map((item, itemIndex) => (
                              <li key={itemIndex} className="flex items-start space-x-3">
                                <div className="w-2 h-2 bg-brand-primary rounded-full mt-2 flex-shrink-0"></div>
                                <span className="leading-relaxed">{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )
                    } else if (paragraph.includes('"') && paragraph.length < 200) {
                      // Quote styling
                      return (
                        <blockquote key={index} className="relative p-8 bg-gradient-to-r from-brand-secondary/10 to-brand-primary/10 rounded-2xl border-l-4 border-brand-accent my-12">
                          <p className="text-lg lg:text-xl text-brand-accent font-medium leading-relaxed italic">
                            {paragraph}
                          </p>
                          <div className="absolute top-4 left-4 text-2xl text-brand-primary opacity-50">&ldquo;</div>
                        </blockquote>
                      )
                    } else if (paragraph.trim()) {
                      return (
                        <p key={index} className="text-gray-700 leading-relaxed text-lg lg:text-xl mb-6">
                          {paragraph}
                        </p>
                      )
                    }
                    return null
                  })}
                </div>
              </div>
              
              {/* Sticky Navigation */}
              <div className="sticky bottom-0 bg-white/95 backdrop-blur-sm border-t border-brand-primary/10 -mx-8 lg:-mx-16 px-8 lg:px-16 py-6 mt-16">
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                  <CTAButton asChild variant="outline" size="lg">
                    <Link href={routes.module(moduleSlug)}>
                      ← Natrag na modul
                    </Link>
                  </CTAButton>
                  
                  {nextLessonHref ? (
                    <CTAButton asChild size="xl" className="shadow-lg hover:shadow-xl">
                      <Link href={nextLessonHref}>
                        {nextLessonText} →
                      </Link>
                    </CTAButton>
                  ) : (
                    <CTAButton asChild size="xl" className="shadow-lg hover:shadow-xl">
                      <Link href={routes.home}>
                        Završi program →
                      </Link>
                    </CTAButton>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </Container>
      </main>
    </div>
  )
}

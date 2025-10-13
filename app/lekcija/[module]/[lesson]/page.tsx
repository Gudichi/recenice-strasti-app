import { BrandHeader } from '@/components/brand-header'
import { BreadcrumbNav } from '@/components/breadcrumb-nav'
import { Button } from '@/components/ui/button'
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
    <div className="min-h-screen bg-background">
      <BrandHeader />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <BreadcrumbNav items={breadcrumbItems} />
          
          <Card>
            <CardContent className="p-8">
              <div className="prose prose-invert max-w-none">
                <h1 className="text-3xl font-bold mb-6">{lesson.title}</h1>
                
                <div className="whitespace-pre-wrap text-base leading-relaxed">
                  {lesson.content}
                </div>
              </div>
              
              <Separator className="my-8" />
              
              <div className="flex justify-between items-center">
                <Link href={routes.module(moduleSlug)}>
                  <Button variant="outline">
                    ← Nazad na modul
                  </Button>
                </Link>
                
                {nextLessonHref ? (
                  <Link href={nextLessonHref}>
                    <Button>
                      {nextLessonText} →
                    </Button>
                  </Link>
                ) : (
                  <Link href={routes.home}>
                    <Button>
                      Završi program →
                    </Button>
                  </Link>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}

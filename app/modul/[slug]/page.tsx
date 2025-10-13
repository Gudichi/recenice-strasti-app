import { BrandHeader } from '@/components/brand-header'
import { BreadcrumbNav } from '@/components/breadcrumb-nav'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
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
    <div className="min-h-screen bg-background">
      <BrandHeader />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <BreadcrumbNav items={breadcrumbItems} />
          
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">{moduleData.title}</h1>
            <p className="text-muted-foreground text-lg">
              {moduleData.description}
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Lekcije</h2>
            
            <div className="grid gap-4">
              {moduleData.lessons.map((lesson) => (
                <Link key={lesson.slug} href={routes.lesson(slug, lesson.slug)}>
                  <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                    <CardHeader>
                      <CardTitle className="text-lg">
                        {lesson.title}
                      </CardTitle>
                      <CardDescription>
                        Kliknite za početak lekcije
                      </CardDescription>
                    </CardHeader>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

import { BrandHeader } from '@/components/brand-header'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import Link from 'next/link'
import { getAllModules, routes } from '@/lib/content'

export default function Dashboard() {
  const modules = getAllModules()
  const userProgress = 42 // TODO: Get from user data

  return (
    <div className="min-h-screen bg-background">
      <BrandHeader />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Welcome Section */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Dobrodošli, Karlo!</h1>
            <p className="text-muted-foreground">
              Nastavite svoje putovanje kroz program Rečenice Strasti
            </p>
          </div>

          {/* Progress Section */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Vaš napredak</CardTitle>
              <CardDescription>
                Ukupno završeno: {userProgress}%
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Progress value={userProgress} className="mb-4" />
              <Link 
                href={routes.lesson('modul-1', 'lekcija-2')}
                className="text-primary hover:underline"
              >
                Lekcija na kojoj si stala: 1.2 Snaga Riječi u Intimnosti →
              </Link>
            </CardContent>
          </Card>

          {/* Modules Grid */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-6">Rečenice Strasti program</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {modules.map((module, index) => (
                <Link key={module.slug} href={routes.module(module.slug)}>
                  <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                    <CardHeader>
                      <CardTitle className="text-lg">
                        {index + 1}. {module.title}
                      </CardTitle>
                      <CardDescription>
                        {module.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="text-sm text-muted-foreground">
                        {module.lessons.length} lekcija
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
              
              {/* Bonus Modules */}
              <Card className="hover:shadow-lg transition-shadow cursor-pointer border-dashed">
                <CardHeader>
                  <CardTitle className="text-lg">Bonus: Napredne Tehnike</CardTitle>
                  <CardDescription>
                    Dodatni sadržaj za najbolje učenike
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-sm text-muted-foreground">
                    Dostupno nakon završetka osnovnog programa
                  </div>
                </CardContent>
              </Card>
              
              <Card className="hover:shadow-lg transition-shadow cursor-pointer border-dashed">
                <CardHeader>
                  <CardTitle className="text-lg">Bonus: Q&A Sessije</CardTitle>
                  <CardDescription>
                    Odgovori na vaša pitanja
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-sm text-muted-foreground">
                    Mjesečne sesije
                  </div>
                </CardContent>
              </Card>
              
              <Card className="hover:shadow-lg transition-shadow cursor-pointer border-dashed">
                <CardHeader>
                  <CardTitle className="text-lg">Bonus: Privatni Grupni Chat</CardTitle>
                  <CardDescription>
                    Povezivanje s drugim članovima
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-sm text-muted-foreground">
                    Ekskluzivna zajednica
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
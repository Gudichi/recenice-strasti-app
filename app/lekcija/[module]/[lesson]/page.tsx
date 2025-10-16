'use client'

import { LessonHeader } from '@/components/lesson/lesson-header'
import { LessonFooter } from '@/components/lesson/lesson-footer'
import { useAuth } from '@/components/providers/auth-provider'
import { useEffect, useState } from 'react'
import { getLesson, getModule, routes, getAllModules } from '@/lib/content'
import { notFound } from 'next/navigation'
import { useParams, useRouter } from 'next/navigation'

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface LessonPageProps {}

export default function LessonPage({}: LessonPageProps) {
  const { user, loading } = useAuth()
  const params = useParams()
  const router = useRouter()
  const moduleSlug = params.module as string
  const lessonSlug = params.lesson as string
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [isCompleted, setIsCompleted] = useState(false)

  useEffect(() => {
    // Redirect to login if not authenticated
    if (!loading && !user) {
      window.location.href = '/login'
    }
  }, [user, loading])

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-[#FFF5EE] flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-[#FF6B9D] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="font-body text-[#2C2C2C]">Učitavanje...</p>
        </div>
      </div>
    )
  }

  // Don't render if not authenticated
  if (!user) {
    return null
  }
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

  // Calculate lesson progress
  const totalLessons = allModules.reduce((total, module) => total + module.lessons.length, 0)
  const currentLessonNumber = allModules
    .slice(0, currentModuleIndex)
    .reduce((total, module) => total + module.lessons.length, 0) + currentLessonIndex + 1

  // Helper functions
  const handleBack = () => {
    router.push(routes.module(moduleSlug))
  }

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked)
  }

  const handleMarkComplete = () => {
    setIsCompleted(true)
  }

  return (
    <div className="min-h-screen bg-[#FFF5EE]">
      <LessonHeader 
        currentLesson={currentLessonNumber}
        totalLessons={totalLessons}
        onBack={handleBack}
        isBookmarked={isBookmarked}
        onBookmark={handleBookmark}
      />
      
      <main className="pb-32">
        {/* Content Container - Max 700px width */}
        <article className="max-w-[700px] mx-auto px-5 py-8">
          {/* ZADATAK Badge */}
          <span className="inline-block bg-[#FFD93D] text-[#2C2C2C] font-heading text-xs font-semibold uppercase tracking-wider px-3 py-1.5 rounded mb-4">
            ZADATAK
          </span>
          
          {/* Lesson Title */}
          <h1 className="font-display text-4xl lg:text-5xl text-[#8B4566] mb-6 leading-tight">
            {lesson.title}
          </h1>
          
          {/* Divider */}
          <div className="w-16 h-1 bg-[#FF6B9D] rounded-full mb-8"></div>
          
          {/* Lesson Intro */}
          <p className="font-body text-xl italic text-[#6B6B6B] leading-relaxed mb-12">
            U ovoj lekciji naučit ćeš kako aktivirati nostalgiju u muškom mozgu i natjerati ga da te kontaktira već danas.
          </p>
          
          {/* Main Content - Simple Book-like Text */}
          <div className="prose prose-lg max-w-none">
            <p className="font-body text-lg leading-relaxed text-[#2C2C2C] mb-6">
              Svaki muškarac ima nostalgiju za prošlima. To je moćan osjećaj koji ga može natjerati da te kontaktira čak i nakon tjedana tišine. Zvjezdana rečenica je ključ koji otključava tu nostalgiju.
            </p>

            <p className="font-body text-lg leading-relaxed text-[#2C2C2C] mb-6">
              Nostalgija je moćan osjećaj koji aktivira limbički sustav u mozgu. Kada muškarac doživljava nostalgiju, oslobađa se dopamin - isti neurotransmiter koji se aktivira kada je sretan.
            </p>

            <p className="font-body text-lg leading-relaxed text-[#2C2C2C] mb-6">
              Zvjezdana rečenica kombinuje nostalgiju s pozitivnim sjećanjem. To stvara moćnu emocionalnu reakciju koja ga natjerava da te kontaktira.
            </p>

            <h2 className="font-heading text-2xl font-semibold text-[#2C2C2C] mt-12 mb-6">
              Što ćete naučiti
            </h2>

            <p className="font-body text-lg leading-relaxed text-[#2C2C2C] mb-6">
              U ovoj lekciji naučit ćete kako aktivirati nostalgiju u muškom mozgu, formulirati Zvjezdanu rečenicu i znati kada i kako poslati poruku.
            </p>

            <h2 className="font-heading text-2xl font-semibold text-[#2C2C2C] mt-12 mb-6">
              Ključna spoznaja
            </h2>

            <p className="font-body text-lg leading-relaxed text-[#2C2C2C] mb-6">
              Dopamin se oslobađa kada muškarac doživljava NOSTALGIJU + POZITIVNO SJEĆANJE povezano s tobom. Kombinacija je ključna!
            </p>

            <h2 className="font-heading text-2xl font-semibold text-[#2C2C2C] mt-12 mb-6">
              Ključne rečenice
            </h2>

            <p className="font-body text-lg leading-relaxed text-[#2C2C2C] mb-6">
              Evo nekoliko primjera Zvjezdanih rečenica koje možete koristiti:
            </p>

            <p className="font-body text-lg leading-relaxed text-[#2C2C2C] mb-6 italic">
              &ldquo;Sinoć sam gledala našu Maricu kako spava i imala je tvoje geste kad pokušava riješiti problem&rdquo;
            </p>

            <p className="font-body text-lg leading-relaxed text-[#2C2C2C] mb-6 italic">
              &ldquo;Svaka rečenica koja se spominje u našoj vezi me most između dva svijeta&rdquo;
            </p>

            <p className="font-body text-lg leading-relaxed text-[#2C2C2C] mb-6 italic">
              &ldquo;Riječi su čarobni ključevi koji otključavaju nova iskustva&rdquo;
            </p>

            <h2 className="font-heading text-2xl font-semibold text-[#2C2C2C] mt-12 mb-6">
              Akcijski koraci
            </h2>

            <p className="font-body text-lg leading-relaxed text-[#2C2C2C] mb-6">
              <strong>1. Prisijeti se pozitivnog sjećanja</strong><br />
              Odaberi trenutak iz vaše veze koji je bio poseban za vas oboje.
            </p>

            <p className="font-body text-lg leading-relaxed text-[#2C2C2C] mb-6">
              <strong>2. Formuliraj rečenicu</strong><br />
              Koristi template: &ldquo;Sinoć sam [radila X] i prisjetila sam se kako smo [Y zajedno radili]&rdquo;
            </p>

            <p className="font-body text-lg leading-relaxed text-[#2C2C2C] mb-6">
              <strong>3. Pošalji WhatsApp poruku</strong><br />
              Pošalji između 19-21h kada je najrelaksiraniji.
            </p>

            <blockquote className="font-body text-lg italic text-[#6B6B6B] border-l-4 border-[#8B4566] pl-6 my-8">
              &ldquo;Nakon što sam poslala Zvjezdanu rečenicu, zvao me je za 30 minuta. Plakao je i molio za drugu priliku!&rdquo; — Una, 34 godine
            </blockquote>
          </div>
        </article>
      </main>
      
      {/* Lesson Footer */}
      <LessonFooter
        nextLessonHref={nextLessonHref}
        nextLessonText={nextLessonText}
        onMarkComplete={handleMarkComplete}
        isCompleted={isCompleted}
      />
    </div>
  )
}

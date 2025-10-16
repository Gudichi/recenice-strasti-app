'use client'

import { Check } from 'lucide-react'
import { CTAButton } from '@/components/ui/cta-button'
import Link from 'next/link'

interface LessonFooterProps {
  nextLessonHref?: string | null
  nextLessonText: string
  onMarkComplete?: () => void
  isCompleted?: boolean
}

export function LessonFooter({ 
  nextLessonHref, 
  nextLessonText, 
  onMarkComplete,
  isCompleted = false 
}: LessonFooterProps) {
  return (
    <div className="sticky bottom-0 bg-[#FFF5EE]/95 backdrop-blur-md border-t border-[#F5E5E0] p-5 max-w-4xl mx-auto">
      <div className="flex flex-col gap-3">
        {/* Next Lesson Button */}
        {nextLessonHref ? (
          <CTAButton asChild size="lg" className="w-full shadow-lg hover:shadow-xl">
            <Link href={nextLessonHref}>
              {nextLessonText} →
            </Link>
          </CTAButton>
        ) : (
          <CTAButton asChild size="lg" className="w-full shadow-lg hover:shadow-xl">
            <Link href="/">
              Završi program →
            </Link>
          </CTAButton>
        )}
        
        {/* Mark Complete Button */}
        <CTAButton 
          variant="outline" 
          size="lg" 
          className="w-full border-[#8B4566] text-[#8B4566] hover:bg-[#8B4566] hover:text-white"
          onClick={onMarkComplete}
          disabled={isCompleted}
        >
          <Check className="w-4 h-4 mr-2" />
          {isCompleted ? 'Označeno kao pročitano' : 'Označi kao pročitano'}
        </CTAButton>
      </div>
    </div>
  )
}

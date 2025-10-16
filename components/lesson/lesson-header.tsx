'use client'

import { ArrowLeft, Bookmark } from 'lucide-react'

interface LessonHeaderProps {
  currentLesson: number
  totalLessons: number
  onBack: () => void
  isBookmarked?: boolean
  onBookmark?: () => void
}

export function LessonHeader({ 
  currentLesson, 
  totalLessons, 
  onBack, 
  isBookmarked = false, 
  onBookmark 
}: LessonHeaderProps) {
  return (
    <header className="sticky top-0 z-50 bg-[#FFF5EE]/95 backdrop-blur-md border-b border-[#F5E5E0] px-4 py-4">
      <div className="max-w-4xl mx-auto flex justify-between items-center">
        {/* Back Button */}
        <button 
          onClick={onBack}
          className="flex items-center gap-2 font-heading text-base text-[#2C2C2C] hover:text-[#FF6B9D] transition-colors duration-200"
        >
          <ArrowLeft className="w-4 h-4" />
          Natrag
        </button>
        
        {/* Progress Indicator */}
        <div className="font-body text-sm text-[#8B4566] font-medium">
          Lekcija {currentLesson}/{totalLessons}
        </div>
        
        {/* Bookmark Button */}
        <button 
          onClick={onBookmark}
          className={`transition-colors duration-200 ${
            isBookmarked 
              ? 'text-[#FF6B9D]' 
              : 'text-[#8B4566] hover:text-[#FF6B9D]'
          }`}
        >
          <Bookmark className={`w-5 h-5 ${isBookmarked ? 'fill-current' : ''}`} />
        </button>
      </div>
    </header>
  )
}

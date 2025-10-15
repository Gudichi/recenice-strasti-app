import { cn } from "@/lib/utils"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import Link from "next/link"

interface LessonCardProps {
  title: string
  description?: string
  href: string
  isCompleted?: boolean
  duration?: string
  className?: string
}

export function LessonCard({
  title,
  description,
  href,
  isCompleted = false,
  duration,
  className
}: LessonCardProps) {
  return (
    <Link href={href} className="group">
      <Card className={cn(
        "transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 cursor-pointer bg-white border-[#F5E5E0]",
        {
          "border-[#FF6B9D]/30 bg-[#8B4566]/5": isCompleted,
        },
        className
      )}>
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <h3 className="font-heading font-medium text-[#2C2C2C] group-hover:text-[#FF6B9D] transition-colors">
                {title}
              </h3>
              {duration && (
                <p className="font-body text-sm text-[#8B4566]">{duration}</p>
              )}
            </div>
            {isCompleted && (
              <div className="w-5 h-5 bg-[#8B4566] rounded-full flex items-center justify-center flex-shrink-0">
                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
            )}
          </div>
        </CardHeader>
        {description && (
          <CardContent className="pt-0">
            <p className="font-body text-sm text-[#2C2C2C] leading-relaxed">
              {description}
            </p>
          </CardContent>
        )}
      </Card>
    </Link>
  )
}

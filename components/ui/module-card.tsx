import { cn } from "@/lib/utils"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

interface ModuleCardProps {
  title: string
  description: string
  href: string
  badge?: string
  isCompleted?: boolean
  lessonCount?: number
  isBonus?: boolean
  className?: string
}

export function ModuleCard({
  title,
  description,
  href,
  badge,
  isCompleted = false,
  lessonCount,
  isBonus = false,
  className
}: ModuleCardProps) {
  return (
    <Link href={href} className="group block h-full">
      <Card className={cn(
        "h-full transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 border-2 cursor-pointer overflow-hidden relative",
        {
          "border-dashed border-gray-300 bg-gradient-to-br from-gray-50/50 to-gray-100/30": isBonus,
          "border-brand-primary/30 bg-gradient-to-br from-brand-secondary/5 to-brand-primary/5": isCompleted,
          "border-brand-primary/10 bg-gradient-to-br from-white to-brand-secondary/3 hover:border-brand-primary/30": !isBonus && !isCompleted,
        },
        className
      )}>
        {/* Hover Glow Effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/5 to-brand-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        
        <CardHeader className="pb-4 relative z-10">
          <div className="flex items-start justify-between">
            <div className="space-y-3">
              <h3 className="font-display text-xl lg:text-2xl text-brand-accent group-hover:text-brand-primary transition-colors duration-300">
                {title}
              </h3>
              {badge && (
                <Badge 
                  variant={isBonus ? "secondary" : "default"}
                  className={cn(
                    "text-xs font-semibold px-3 py-1",
                    isBonus 
                      ? "bg-brand-secondary/20 text-brand-accent border-brand-secondary/30"
                      : "bg-brand-cta text-white shadow-md"
                  )}
                >
                  {badge}
                </Badge>
              )}
            </div>
            {isCompleted && (
              <div className="w-8 h-8 bg-brand-accent rounded-full flex items-center justify-center shadow-lg">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent className="pt-0 relative z-10">
          <p className="text-gray-600 leading-relaxed mb-4 text-sm lg:text-base">
            {description}
          </p>
          {lessonCount !== undefined && (
            <div className="flex items-center justify-between">
              <div className="text-sm text-brand-accent font-semibold">
                {lessonCount} lekcija
              </div>
              <div className="text-brand-primary group-hover:translate-x-1 transition-transform duration-300">
                →
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </Link>
  )
}

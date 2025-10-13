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
    <Link href={href} className="group">
      <Card className={cn(
        "h-full transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border-2 hover:border-brand-primary/20 cursor-pointer",
        {
          "border-dashed border-gray-300 bg-gray-50/50": isBonus,
          "border-brand-primary/30 bg-brand-secondary/5": isCompleted,
        },
        className
      )}>
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <h3 className="font-display text-xl text-brand-accent group-hover:text-brand-primary transition-colors">
                {title}
              </h3>
              {badge && (
                <Badge 
                  variant={isBonus ? "secondary" : "default"}
                  className={cn(
                    "text-xs font-medium",
                    isBonus 
                      ? "bg-brand-secondary/20 text-brand-accent border-brand-secondary/30"
                      : "bg-brand-cta text-white"
                  )}
                >
                  {badge}
                </Badge>
              )}
            </div>
            {isCompleted && (
              <div className="w-6 h-6 bg-brand-accent rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <p className="text-gray-600 leading-relaxed mb-3">
            {description}
          </p>
          {lessonCount && (
            <div className="text-sm text-brand-accent font-medium">
              {lessonCount} lekcija
            </div>
          )}
        </CardContent>
      </Card>
    </Link>
  )
}

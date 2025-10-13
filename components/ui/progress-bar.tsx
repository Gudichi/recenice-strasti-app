import { cn } from "@/lib/utils"

interface ProgressBarProps {
  value: number
  label?: string
  showPercentage?: boolean
  className?: string
  size?: "sm" | "md" | "lg"
}

export function ProgressBar({ 
  value, 
  label, 
  showPercentage = true, 
  className,
  size = "md"
}: ProgressBarProps) {
  const sizeClasses = {
    sm: "h-2",
    md: "h-3", 
    lg: "h-4"
  }

  return (
    <div className={cn("space-y-2", className)}>
      {(label || showPercentage) && (
        <div className="flex justify-between items-center text-sm">
          {label && <span className="text-gray-600 font-medium">{label}</span>}
          {showPercentage && (
            <span className="text-brand-accent font-semibold">{value}%</span>
          )}
        </div>
      )}
      <div className={cn(
        "w-full bg-gray-200 rounded-full overflow-hidden",
        sizeClasses[size]
      )}>
        <div 
          className="h-full bg-gradient-to-r from-brand-primary to-brand-secondary transition-all duration-500 ease-out rounded-full"
          style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
        />
      </div>
    </div>
  )
}

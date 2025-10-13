import { cn } from "@/lib/utils"

interface ContainerProps {
  children: React.ReactNode
  className?: string
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "full"
}

export function Container({ 
  children, 
  className, 
  maxWidth = "xl" 
}: ContainerProps) {
  return (
    <div 
      className={cn(
        "mx-auto px-4 sm:px-6 lg:px-8",
        {
          "max-w-sm": maxWidth === "sm",
          "max-w-md": maxWidth === "md", 
          "max-w-lg": maxWidth === "lg",
          "max-w-xl": maxWidth === "xl",
          "max-w-2xl": maxWidth === "2xl",
          "max-w-full": maxWidth === "full",
        },
        className
      )}
    >
      {children}
    </div>
  )
}

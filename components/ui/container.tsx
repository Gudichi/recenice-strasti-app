import { cn } from "@/lib/utils"

interface ContainerProps {
  children: React.ReactNode
  className?: string
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "4xl" | "6xl" | "7xl" | "8xl" | "full"
}

export function Container({ 
  children, 
  className, 
  maxWidth = "6xl" 
}: ContainerProps) {
  return (
    <div 
      className={cn(
        "mx-auto px-4 sm:px-6 lg:px-8 xl:px-12",
        {
          "max-w-sm": maxWidth === "sm",
          "max-w-md": maxWidth === "md", 
          "max-w-lg": maxWidth === "lg",
          "max-w-xl": maxWidth === "xl",
          "max-w-2xl": maxWidth === "2xl",
          "max-w-4xl": maxWidth === "4xl",
          "max-w-6xl": maxWidth === "6xl",
          "max-w-7xl": maxWidth === "7xl",
          "max-w-8xl": maxWidth === "8xl",
          "max-w-full": maxWidth === "full",
        },
        className
      )}
    >
      {children}
    </div>
  )
}

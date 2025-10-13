import { cn } from "@/lib/utils"

interface SectionTitleProps {
  children: React.ReactNode
  className?: string
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6"
  showUnderline?: boolean
}

export function SectionTitle({ 
  children, 
  className, 
  as: Component = "h2",
  showUnderline = true 
}: SectionTitleProps) {
  return (
    <Component 
      className={cn(
        "font-display text-brand-accent mb-6",
        {
          "text-4xl lg:text-5xl": Component === "h1",
          "text-3xl lg:text-4xl": Component === "h2", 
          "text-2xl lg:text-3xl": Component === "h3",
          "text-xl lg:text-2xl": Component === "h4",
        },
        className
      )}
    >
      {children}
      {showUnderline && (
        <div className="mt-4 w-24 h-1 bg-brand-secondary rounded-full" />
      )}
    </Component>
  )
}

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-2xl text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 min-h-[48px] px-8 py-3 relative overflow-hidden group",
  {
    variants: {
      variant: {
        primary: "bg-brand-cta text-white hover:bg-brand-cta/90 hover:shadow-xl hover:-translate-y-1 hover:scale-105 before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent before:translate-x-[-100%] hover:before:translate-x-[100%] before:transition-transform before:duration-700",
        secondary: "border-2 border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-white hover:shadow-xl hover:-translate-y-1 hover:scale-105 bg-white/80 backdrop-blur-sm",
        outline: "border border-gray-300 bg-white/80 backdrop-blur-sm text-gray-700 hover:bg-gray-50 hover:border-gray-400 hover:shadow-lg hover:-translate-y-0.5",
        ghost: "text-brand-accent hover:bg-brand-secondary/20 hover:text-brand-accent hover:scale-105",
        link: "text-brand-cta underline-offset-4 hover:underline hover:text-brand-cta/80",
      },
      size: {
        sm: "h-9 px-4 text-xs",
        default: "h-12 px-6 text-sm",
        lg: "h-14 px-8 text-base",
        xl: "h-16 px-10 text-lg",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "lg",
    },
  }
)

export interface CTAButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const CTAButton = React.forwardRef<HTMLButtonElement, CTAButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
CTAButton.displayName = "CTAButton"

export { CTAButton, buttonVariants }

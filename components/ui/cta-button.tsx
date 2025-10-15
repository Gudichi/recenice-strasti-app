import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-[50px] font-heading font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 min-h-[44px] relative overflow-hidden group cursor-pointer",
  {
    variants: {
      variant: {
        primary: "bg-gradient-to-r from-brand-primary to-brand-cta text-white shadow-[0_6px_25px_rgba(255,107,157,0.35)] hover:shadow-[0_8px_30px_rgba(255,107,157,0.45)] hover:-translate-y-[3px] active:translate-y-[-1px] before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent before:translate-x-[-100%] hover:before:translate-x-[100%] before:transition-transform before:duration-700",
        secondary: "bg-brand-secondary text-white border-2 border-transparent hover:bg-brand-secondary-light hover:border-brand-primary hover:shadow-xl hover:-translate-y-[3px] active:translate-y-[-1px]",
        tertiary: "bg-transparent text-brand-secondary border-2 border-brand-secondary hover:bg-brand-secondary hover:text-white hover:shadow-lg hover:-translate-y-[2px] active:translate-y-[-1px]",
        outline: "border border-brand-border-light bg-white/80 backdrop-blur-sm text-brand-text hover:bg-brand-accent hover:border-brand-primary hover:shadow-lg hover:-translate-y-[2px]",
        ghost: "text-brand-secondary hover:bg-brand-secondary/10 hover:text-brand-secondary hover:scale-105",
        link: "text-brand-primary underline-offset-4 hover:underline hover:text-brand-primary-dark",
      },
      size: {
        sm: "h-9 px-4 text-sm",
        default: "h-12 px-6 text-base",
        lg: "h-14 px-8 text-lg",
        xl: "h-16 px-10 text-xl",
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
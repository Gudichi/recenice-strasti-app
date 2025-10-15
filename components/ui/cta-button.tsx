import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-[50px] font-heading font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 min-h-[44px] relative overflow-hidden group cursor-pointer",
  {
    variants: {
      variant: {
        primary: "bg-gradient-to-r from-[#FF6B9D] to-[#FFDAB9] text-white shadow-[0_6px_25px_rgba(255,107,157,0.35)] hover:shadow-[0_8px_30px_rgba(255,107,157,0.45)] hover:-translate-y-[3px] active:translate-y-[-1px] before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent before:translate-x-[-100%] hover:before:translate-x-[100%] before:transition-transform before:duration-700",
        secondary: "bg-[#8B4566] text-white border-2 border-transparent hover:bg-[#A05577] hover:border-[#FF6B9D] hover:shadow-xl hover:-translate-y-[3px] active:translate-y-[-1px]",
        tertiary: "bg-transparent text-[#8B4566] border-2 border-[#8B4566] hover:bg-[#8B4566] hover:text-white hover:shadow-lg hover:-translate-y-[2px] active:translate-y-[-1px]",
        outline: "border border-[#F5E5E0] bg-white/80 backdrop-blur-sm text-[#2C2C2C] hover:bg-[#FFF5EE] hover:border-[#FF6B9D] hover:shadow-lg hover:-translate-y-[2px]",
        ghost: "text-[#8B4566] hover:bg-[#8B4566]/10 hover:text-[#8B4566] hover:scale-105",
        link: "text-[#FF6B9D] underline-offset-4 hover:underline hover:text-[#E5578A]",
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
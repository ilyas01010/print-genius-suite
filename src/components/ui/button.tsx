
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        subtle: "bg-primary/10 text-primary hover:bg-primary/20",
        soft: "bg-muted text-muted-foreground hover:bg-muted/80",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        xl: "h-12 rounded-md px-8 text-base",
        icon: "h-10 w-10",
        "icon-sm": "h-8 w-8 rounded-md",
        responsive: "h-auto min-h-9 px-3 py-2 md:h-10 md:px-4",
      },
      loading: {
        true: "relative text-transparent transition-none hover:text-transparent [&>span]:opacity-0 [&>svg]:opacity-0",
      },
      fullWidth: {
        true: "w-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  loading?: boolean
  fullWidth?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, fullWidth, asChild = false, loading, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    
    // Ensure disabled is properly set when loading
    const disabled = props.disabled || loading
    
    // Create the loading spinner or display the children
    const content = loading ? (
      <>
        <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <svg 
            className="animate-spin h-4 w-4" 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle 
              className="opacity-25" 
              cx="12" 
              cy="12" 
              r="10" 
              stroke="currentColor" 
              strokeWidth="4"
            ></circle>
            <path 
              className="opacity-75" 
              fill="currentColor" 
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        </span>
        {children}
      </>
    ) : children;

    // Normal button case (non-asChild)
    if (!asChild) {
      return (
        <button
          className={cn(buttonVariants({ variant, size, loading, fullWidth }), className)}
          ref={ref}
          disabled={disabled}
          {...props}
        >
          {content}
        </button>
      );
    }
    
    // Handle asChild case carefully
    // We need to make sure we have a valid React element
    const childArray = React.Children.toArray(children);
    if (childArray.length !== 1 || !React.isValidElement(childArray[0])) {
      console.error("Button with asChild prop must have exactly one child element");
      return (
        <button
          className={cn(buttonVariants({ variant, size, loading, fullWidth }), className)}
          ref={ref}
          disabled={disabled}
          {...props}
        >
          {content}
        </button>
      );
    }
    
    const child = childArray[0] as React.ReactElement;
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, loading, fullWidth }), className)}
        ref={ref}
        disabled={disabled}
        {...props}
      >
        {React.cloneElement(child, {
          ...child.props,
          disabled
        })}
      </Comp>
    );
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }

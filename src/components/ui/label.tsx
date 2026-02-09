// components/ui/label.tsx
import * as React from "react"
import * as LabelPrimitive from "@radix-ui/react-label"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const labelVariants = cva(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
  {
    variants: {
      variant: {
        default: "text-primary-900",
        muted: "text-primary-600",
        error: "text-red-600",
        success: "text-green-600",
        warning: "text-yellow-600",
      },
      size: {
        sm: "text-xs",
        md: "text-sm",
        lg: "text-base",
      },
      required: {
        true: "after:content-['*'] after:ml-0.5 after:text-red-500",
      },
      disabled: {
        true: "text-primary-400",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
)

export interface LabelProps
  extends React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>,
    VariantProps<typeof labelVariants> {
  htmlFor?: string
  tooltip?: string
  icon?: React.ReactNode
}

const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  LabelProps
>(({ className, variant, size, required, disabled, tooltip, icon, children, ...props }, ref) => {
  return (
    <div className="flex items-center gap-2">
      {icon && <span className="text-primary-500">{icon}</span>}
      <LabelPrimitive.Root
        ref={ref}
        className={cn(labelVariants({ variant, size, required, disabled }), className)}
        {...props}
      >
        {children}
      </LabelPrimitive.Root>
      {tooltip && (
        <span className="text-primary-400" title={tooltip}>
          ⓘ
        </span>
      )}
    </div>
  )
})
Label.displayName = LabelPrimitive.Root.displayName

// Form Field Label Component
interface FormFieldLabelProps extends LabelProps {
  description?: string
  error?: string
}

export const FormFieldLabel = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  FormFieldLabelProps
>(({ className, description, error, children, ...props }, ref) => {
  return (
    <div className="space-y-2">
      <Label ref={ref} className={className} {...props}>
        {children}
      </Label>
      {description && !error && (
        <p className="text-sm text-primary-500">{description}</p>
      )}
      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}
    </div>
  )
})
FormFieldLabel.displayName = "FormFieldLabel"

export { Label }
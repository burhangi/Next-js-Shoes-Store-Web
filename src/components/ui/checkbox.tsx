// components/ui/checkbox.tsx
import * as React from "react"
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"
import { Check, Minus } from "lucide-react"
import { cn } from "@/lib/utils/cn"
import { motion } from "framer-motion"

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> & {
    label?: string
    description?: string
    error?: string
    size?: "sm" | "md" | "lg"
    indeterminate?: boolean
  }
>(({ className, label, description, error, size = "md", indeterminate, ...props }, ref) => {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-5 w-5",
    lg: "h-6 w-6",
  }

  const iconSizes = {
    sm: "h-3 w-3",
    md: "h-4 w-4",
    lg: "h-5 w-5",
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-start gap-3">
        <CheckboxPrimitive.Root
          ref={ref}
          className={cn(
            "peer shrink-0 rounded border-2 border-primary-300 ring-offset-background",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
            "disabled:cursor-not-allowed disabled:opacity-50",
            "data-[state=checked]:border-accent-600 data-[state=checked]:bg-accent-600",
            "data-[state=indeterminate]:border-accent-600 data-[state=indeterminate]:bg-accent-600",
            sizeClasses[size],
            className
          )}
          {...props}
        >
          <CheckboxPrimitive.Indicator asChild>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
              className="flex items-center justify-center text-white"
            >
              {indeterminate ? (
                <Minus className={iconSizes[size]} />
              ) : (
                <Check className={iconSizes[size]} />
              )}
            </motion.div>
          </CheckboxPrimitive.Indicator>
        </CheckboxPrimitive.Root>
        
        {(label || description) && (
          <div className="grid gap-1.5">
            {label && (
              <label
                htmlFor={props.id}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {label}
              </label>
            )}
            {description && (
              <p className="text-sm text-primary-500">
                {description}
              </p>
            )}
          </div>
        )}
      </div>
      
      {error && (
        <p className="text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  )
})
Checkbox.displayName = "Checkbox"

// Checkbox Group Component
interface CheckboxGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  options: Array<{
    id: string
    label: string
    description?: string
    disabled?: boolean
  }>
  value: string[]
  onValueChange: (value: string[]) => void
  orientation?: "horizontal" | "vertical"
}

export const CheckboxGroup = React.forwardRef<HTMLDivElement, CheckboxGroupProps>(
  ({ className, options, value, onValueChange, orientation = "vertical", ...props }, ref) => {
    const handleCheckboxChange = (optionId: string, checked: boolean) => {
      if (checked) {
        onValueChange([...value, optionId])
      } else {
        onValueChange(value.filter(id => id !== optionId))
      }
    }

    return (
      <div
        ref={ref}
        className={cn(
          "space-y-3",
          orientation === "horizontal" && "flex flex-wrap gap-4",
          className
        )}
        {...props}
      >
        {options.map((option) => (
          <Checkbox
            key={option.id}
            id={option.id}
            label={option.label}
            description={option.description}
            checked={value.includes(option.id)}
            onCheckedChange={(checked) => 
              handleCheckboxChange(option.id, checked as boolean)
            }
            disabled={option.disabled}
          />
        ))}
      </div>
    )
  }
)
CheckboxGroup.displayName = "CheckboxGroup"

export { Checkbox }
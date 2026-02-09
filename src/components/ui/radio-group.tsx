// components/ui/radio-group.tsx
import * as React from "react"
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group"
import { Circle } from "lucide-react"
import { cn } from "@/lib/utils"

const RadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root> & {
    orientation?: "horizontal" | "vertical"
  }
>(({ className, orientation = "vertical", ...props }, ref) => (
  <RadioGroupPrimitive.Root
    ref={ref}
    className={cn(
      "gap-2",
      orientation === "horizontal" ? "flex flex-wrap" : "grid",
      className
    )}
    {...props}
  />
))
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName

const RadioGroupItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item> & {
    label?: string
    description?: string
    icon?: React.ReactNode
    error?: string
  }
>(({ className, label, description, icon, error, children, ...props }, ref) => {
  return (
    <div className="space-y-2">
      <div className="flex items-start gap-3">
        <RadioGroupPrimitive.Item
          ref={ref}
          className={cn(
            "aspect-square h-5 w-5 rounded-full border-2 border-primary-300 text-accent-600 ring-offset-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            "data-[state=checked]:border-accent-600",
            className
          )}
          {...props}
        >
          <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
            <Circle className="h-2.5 w-2.5 fill-current text-current" />
          </RadioGroupPrimitive.Indicator>
        </RadioGroupPrimitive.Item>
        
        {(label || description || icon) && (
          <div className="grid gap-1.5">
            <div className="flex items-center gap-2">
              {icon && <span className="text-primary-500">{icon}</span>}
              <label
                htmlFor={props.id}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {label}
              </label>
            </div>
            {description && (
              <p className="text-sm text-primary-500">
                {description}
              </p>
            )}
          </div>
        )}
        
        {children}
      </div>
      
      {error && (
        <p className="text-sm text-red-600 pl-8">
          {error}
        </p>
      )}
    </div>
  )
})
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName

// Card Radio Group Component
interface CardRadioOption {
  value: string
  label: string
  description?: string
  icon?: React.ReactNode
  disabled?: boolean
}

interface CardRadioGroupProps {
  options: CardRadioOption[]
  value: string
  onValueChange: (value: string) => void
  className?: string
}

export const CardRadioGroup = ({
  options,
  value,
  onValueChange,
  className,
}: CardRadioGroupProps) => {
  return (
    <RadioGroup
      value={value}
      onValueChange={onValueChange}
      className={cn("grid gap-3", className)}
    >
      {options.map((option) => (
        <label
          key={option.value}
          className={cn(
            "flex cursor-pointer items-start gap-4 rounded-lg border-2 p-4 transition-all",
            value === option.value
              ? "border-accent-500 bg-accent-50"
              : "border-primary-200 hover:border-primary-300",
            option.disabled && "opacity-50 cursor-not-allowed"
          )}
        >
          <RadioGroupItem
            value={option.value}
            id={option.value}
            disabled={option.disabled}
            className="mt-0.5"
          />
          <div className="flex-1">
            <div className="flex items-center gap-2">
              {option.icon && (
                <span className="text-primary-500">{option.icon}</span>
              )}
              <span className="font-medium">{option.label}</span>
            </div>
            {option.description && (
              <p className="mt-1 text-sm text-primary-600">
                {option.description}
              </p>
            )}
          </div>
        </label>
      ))}
    </RadioGroup>
  )
}

export { RadioGroup, RadioGroupItem }
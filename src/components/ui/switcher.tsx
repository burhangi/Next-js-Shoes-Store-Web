// components/ui/switch.tsx
import * as React from "react"
import * as SwitchPrimitives from "@radix-ui/react-switch"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root> & {
    label?: string
    description?: string
    size?: "sm" | "md" | "lg"
    variant?: "default" | "success" | "warning" | "destructive"
    icon?: React.ReactNode
    loading?: boolean
  }
>(({
  className,
  label,
  description,
  size = "md",
  variant = "default",
  icon,
  loading = false,
  ...props
}, ref) => {
  const sizeClasses = {
    sm: "h-5 w-9",
    md: "h-6 w-11",
    lg: "h-7 w-14",
  }

  const thumbSize = {
    sm: "h-4 w-4",
    md: "h-5 w-5",
    lg: "h-6 w-6",
  }

  const variantColors = {
    default: "data-[state=checked]:bg-accent-600",
    success: "data-[state=checked]:bg-green-600",
    warning: "data-[state=checked]:bg-yellow-600",
    destructive: "data-[state=checked]:bg-red-600",
  }

  return (
    <div className="flex items-start gap-3">
      <SwitchPrimitives.Root
        className={cn(
          "peer inline-flex shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=unchecked]:bg-primary-300",
          variantColors[variant],
          sizeClasses[size],
          className
        )}
        disabled={loading || props.disabled}
        {...props}
        ref={ref}
      >
        <SwitchPrimitives.Thumb
          className={cn(
            "pointer-events-none block rounded-full bg-white shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-full data-[state=unchecked]:translate-x-0",
            thumbSize[size],
            loading && "opacity-50"
          )}
        >
          {loading && (
            <div className="flex h-full w-full items-center justify-center">
              <div className="h-2 w-2 animate-spin rounded-full border border-t-transparent" />
            </div>
          )}
        </SwitchPrimitives.Thumb>
      </SwitchPrimitives.Root>

      {(label || description || icon) && (
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            {icon && <span className="text-primary-500">{icon}</span>}
            {label && (
              <label
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                htmlFor={props.id}
              >
                {label}
              </label>
            )}
          </div>
          {description && (
            <p className="text-sm text-primary-500">
              {description}
            </p>
          )}
        </div>
      )}
    </div>
  )
})
Switch.displayName = SwitchPrimitives.Root.displayName

// Toggle Switch Group Component
interface ToggleGroupItem {
  id: string
  label: string
  description?: string
  value: boolean
}

interface ToggleGroupProps {
  items: ToggleGroupItem[]
  onChange: (id: string, value: boolean) => void
  title?: string
  description?: string
}

export const ToggleGroup = ({
  items,
  onChange,
  title,
  description,
}: ToggleGroupProps) => {
  return (
    <div className="space-y-6">
      {(title || description) && (
        <div className="space-y-2">
          {title && (
            <h3 className="text-lg font-semibold text-primary-900">{title}</h3>
          )}
          {description && (
            <p className="text-sm text-primary-600">{description}</p>
          )}
        </div>
      )}

      <div className="space-y-4">
        {items.map((item) => (
          <div key={item.id} className="flex items-center justify-between">
            <div>
              <p className="font-medium text-primary-900">{item.label}</p>
              {item.description && (
                <p className="text-sm text-primary-600">{item.description}</p>
              )}
            </div>
            <Switch
              checked={item.value}
              onCheckedChange={(checked) => onChange(item.id, checked)}
              size="md"
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export { Switch }
// components/ui/toggle.tsx
import * as React from "react"
import * as TogglePrimitive from "@radix-ui/react-toggle"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const toggleVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors hover:bg-muted hover:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-accent data-[state=on]:text-accent-foreground",
  {
    variants: {
      variant: {
        default: "bg-transparent",
        outline:
          "border border-input bg-transparent hover:bg-accent hover:text-accent-foreground",
      },
      size: {
        sm: "h-9 px-2.5",
        default: "h-10 px-3",
        lg: "h-11 px-5",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

const Toggle = React.forwardRef<
  React.ElementRef<typeof TogglePrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof TogglePrimitive.Root> &
    VariantProps<typeof toggleVariants> & {
      icon?: React.ReactNode
      iconOnly?: boolean
      pressed?: boolean
      onPressedChange?: (pressed: boolean) => void
    }
>(({ className, variant, size, icon, iconOnly, pressed, onPressedChange, children, ...props }, ref) => {
  return (
    <TogglePrimitive.Root
      ref={ref}
      className={cn(
        toggleVariants({ variant, size }),
        iconOnly && "aspect-square p-0",
        className
      )}
      pressed={pressed}
      onPressedChange={onPressedChange}
      {...props}
    >
      {icon && <span className={cn(children ? "mr-2" : "")}>{icon}</span>}
      {children && (
        <span className={cn(iconOnly && "sr-only")}>{children}</span>
      )}
    </TogglePrimitive.Root>
  )
})
Toggle.displayName = TogglePrimitive.Root.displayName

// Toggle Group Component
interface ToggleGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string
  onValueChange: (value: string) => void
  items: Array<{
    value: string
    label: string
    icon?: React.ReactNode
  }>
  type?: "single" | "multiple"
  size?: "sm" | "default" | "lg"
  variant?: "default" | "outline"
}

export const ToggleGroup = ({
  className,
  value,
  onValueChange,
  items,
  type = "single",
  size = "default",
  variant = "default",
  ...props
}: ToggleGroupProps) => {
  return (
    <div
      className={cn("flex items-center gap-1", className)}
      role="group"
      {...props}
    >
      {items.map((item) => (
        <Toggle
          key={item.value}
          size={size}
          variant={variant}
          pressed={value === item.value}
          onPressedChange={() => onValueChange(item.value)}
          icon={item.icon}
          aria-label={item.label}
        >
          {item.label}
        </Toggle>
      ))}
    </div>
  )
}

// View Toggle Component (Grid/List View)
interface ViewToggleProps {
  view: "grid" | "list"
  onViewChange: (view: "grid" | "list") => void
  gridIcon?: React.ReactNode
  listIcon?: React.ReactNode
}

export const ViewToggle = ({
  view,
  onViewChange,
  gridIcon = "⏹️",
  listIcon = "📋",
}: ViewToggleProps) => {
  return (
    <ToggleGroup
      value={view}
      onValueChange={(value) => onViewChange(value as "grid" | "list")}
      items={[
        {
          value: "grid",
          label: "Grid View",
          icon: gridIcon,
        },
        {
          value: "list",
          label: "List View",
          icon: listIcon,
        },
      ]}
      size="sm"
    />
  )
}

export { Toggle, toggleVariants }
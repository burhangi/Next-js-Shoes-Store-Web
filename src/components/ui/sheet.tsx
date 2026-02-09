// components/ui/sheet.tsx
import * as React from "react"
import * as SheetPrimitive from "@radix-ui/react-dialog"
import { cva, type VariantProps } from "class-variance-authority"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

const Sheet = SheetPrimitive.Root

const SheetTrigger = SheetPrimitive.Trigger

const SheetClose = SheetPrimitive.Close

const SheetPortal = SheetPrimitive.Portal

const SheetOverlay = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Overlay
    ref={ref}
    className={cn(
      "fixed inset-0 z-50 bg-black/80 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    )}
    {...props}
  />
))
SheetOverlay.displayName = SheetPrimitive.Overlay.displayName

const sheetVariants = cva(
  "fixed z-50 gap-4 bg-background p-6 shadow-lg transition ease-in-out data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:duration-300 data-[state=open]:duration-500",
  {
    variants: {
      side: {
        top: "inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",
        bottom:
          "inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
        left: "inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm",
        right:
          "inset-y-0 right-0 h-full w-3/4 border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm",
      },
    },
    defaultVariants: {
      side: "right",
    },
  }
)

interface SheetContentProps
  extends React.ComponentPropsWithoutRef<typeof SheetPrimitive.Content>,
    VariantProps<typeof sheetVariants> {
  showCloseButton?: boolean
  overlay?: boolean
}

const SheetContent = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Content>,
  SheetContentProps
>(({ side = "right", className, children, showCloseButton = true, overlay = true, ...props }, ref) => (
  <SheetPortal>
    {overlay && <SheetOverlay />}
    <SheetPrimitive.Content
      ref={ref}
      className={cn(sheetVariants({ side }), className)}
      {...props}
    >
      <motion.div
        initial={{ opacity: 0, x: side === "right" ? 20 : -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
        className="h-full"
      >
        {children}
      </motion.div>
      {showCloseButton && (
        <SheetPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary">
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </SheetPrimitive.Close>
      )}
    </SheetPrimitive.Content>
  </SheetPortal>
))
SheetContent.displayName = SheetPrimitive.Content.displayName

const SheetHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col space-y-2 text-center sm:text-left",
      className
    )}
    {...props}
  />
)
SheetHeader.displayName = "SheetHeader"

const SheetFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
      className
    )}
    {...props}
  />
)
SheetFooter.displayName = "SheetFooter"

const SheetTitle = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Title>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Title
    ref={ref}
    className={cn("text-lg font-semibold text-foreground", className)}
    {...props}
  />
))
SheetTitle.displayName = SheetPrimitive.Title.displayName

const SheetDescription = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Description>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Description
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
SheetDescription.displayName = SheetPrimitive.Description.displayName

// Filter Sheet Component
interface FilterSheetProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  filters: Array<{
    id: string
    label: string
    type: "range" | "select" | "checkbox" | "color"
    options?: Array<{ label: string; value: string }>
    min?: number
    max?: number
    step?: number
  }>
  values: Record<string, any>
  onChange: (id: string, value: any) => void
  onApply?: () => void
  onReset?: () => void
}

export const FilterSheet = ({
  open,
  onOpenChange,
  filters,
  values,
  onChange,
  onApply,
  onReset,
}: FilterSheetProps) => {
  const handleReset = () => {
    filters.forEach(filter => {
      if (filter.type === "range") {
        onChange(filter.id, [filter.min, filter.max])
      } else if (filter.type === "select" || filter.type === "checkbox") {
        onChange(filter.id, [])
      }
    })
    onReset?.()
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full sm:max-w-md">
        <SheetHeader>
          <SheetTitle>Filters</SheetTitle>
          <SheetDescription>
            Narrow down your search results
          </SheetDescription>
        </SheetHeader>

        <div className="py-6 space-y-6">
          {filters.map((filter) => (
            <div key={filter.id} className="space-y-3">
              <h4 className="font-medium text-primary-900">{filter.label}</h4>
              
              {filter.type === "range" && (
                <div className="px-2">
                  <input
                    type="range"
                    min={filter.min}
                    max={filter.max}
                    step={filter.step}
                    value={values[filter.id]?.[0] || filter.min}
                    onChange={(e) => onChange(filter.id, [
                      Number(e.target.value),
                      values[filter.id]?.[1] || filter.max
                    ])}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-primary-500 mt-2">
                    <span>${values[filter.id]?.[0] || filter.min}</span>
                    <span>${values[filter.id]?.[1] || filter.max}</span>
                  </div>
                </div>
              )}

              {filter.type === "select" && filter.options && (
                <select
                  value={values[filter.id] || ""}
                  onChange={(e) => onChange(filter.id, e.target.value)}
                  className="w-full rounded-lg border border-primary-300 px-3 py-2"
                >
                  <option value="">All</option>
                  {filter.options.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              )}

              {filter.type === "checkbox" && filter.options && (
                <div className="space-y-2">
                  {filter.options.map((option) => (
                    <label key={option.value} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={(values[filter.id] || []).includes(option.value)}
                        onChange={(e) => {
                          const current = values[filter.id] || []
                          const newValue = e.target.checked
                            ? [...current, option.value]
                            : current.filter(v => v !== option.value)
                          onChange(filter.id, newValue)
                        }}
                        className="rounded border-primary-300 text-accent-600"
                      />
                      <span className="text-sm text-primary-700">
                        {option.label}
                      </span>
                    </label>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        <SheetFooter className="mt-6">
          <button
            onClick={handleReset}
            className="px-4 py-2 text-sm font-medium text-primary-600 hover:text-primary-900"
          >
            Reset All
          </button>
          <button
            onClick={() => {
              onApply?.()
              onOpenChange(false)
            }}
            className="px-4 py-2 text-sm font-medium text-white bg-accent-600 rounded-lg hover:bg-accent-700"
          >
            Apply Filters
          </button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}

export {
  Sheet,
  SheetPortal,
  SheetOverlay,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
}
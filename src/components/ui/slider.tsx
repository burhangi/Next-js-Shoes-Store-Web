// components/ui/slider.tsx
import * as React from "react"
import * as SliderPrimitive from "@radix-ui/react-slider"
import { cn } from "@/lib/utils/cn"

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root> & {
    showLabels?: boolean
    formatLabel?: (value: number) => string
    variant?: "default" | "range" | "vertical"
    size?: "sm" | "md" | "lg"
    showMarks?: boolean
    marks?: number[]
  }
>(({
  className,
  showLabels = false,
  formatLabel,
  variant = "default",
  size = "md",
  showMarks = false,
  marks,
  ...props
}, ref) => {
  const sizeClasses = {
    sm: "h-1",
    md: "h-2",
    lg: "h-3",
  }

  const thumbSize = {
    sm: "h-4 w-4",
    md: "h-5 w-5",
    lg: "h-6 w-6",
  }

  return (
    <div className="w-full">
      {showLabels && props.value && (
        <div className="flex justify-between text-sm text-primary-600 mb-2">
          <span>
            {formatLabel 
              ? formatLabel(Array.isArray(props.value) ? props.value[0] : props.value)
              : Array.isArray(props.value) ? props.value[0] : props.value
            }
          </span>
          {Array.isArray(props.value) && props.value.length > 1 && (
            <span>
              {formatLabel 
                ? formatLabel(props.value[1])
                : props.value[1]
              }
            </span>
          )}
        </div>
      )}

      <SliderPrimitive.Root
        ref={ref}
        className={cn(
          "relative flex w-full touch-none select-none items-center",
          variant === "vertical" && "h-full flex-col",
          className
        )}
        {...props}
      >
        <SliderPrimitive.Track
          className={cn(
            "relative grow overflow-hidden rounded-full bg-primary-200",
            sizeClasses[size],
            variant === "vertical" && "w-2 h-full"
          )}
        >
          <SliderPrimitive.Range className="absolute bg-accent-600" />
          
          {showMarks && props.max && (
            <div className="absolute inset-0 flex items-center justify-between px-2">
              {marks?.map((mark, index) => (
                <div
                  key={index}
                  className="h-1 w-1 rounded-full bg-primary-400"
                  style={{
                    left: `${(mark / (props.max || 100)) * 100}%`,
                  }}
                />
              ))}
            </div>
          )}
        </SliderPrimitive.Track>
        
        {Array.isArray(props.value) ? (
          <>
            <SliderPrimitive.Thumb
              className={cn(
                "block rounded-full border-2 border-white bg-accent-600 ring-2 ring-accent-200 transition-colors focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-accent-300 disabled:pointer-events-none disabled:opacity-50",
                thumbSize[size]
              )}
            />
            <SliderPrimitive.Thumb
              className={cn(
                "block rounded-full border-2 border-white bg-accent-600 ring-2 ring-accent-200 transition-colors focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-accent-300 disabled:pointer-events-none disabled:opacity-50",
                thumbSize[size]
              )}
            />
          </>
        ) : (
          <SliderPrimitive.Thumb
            className={cn(
              "block rounded-full border-2 border-white bg-accent-600 ring-2 ring-accent-200 transition-colors focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-accent-300 disabled:pointer-events-none disabled:opacity-50",
              thumbSize[size]
            )}
          />
        )}
      </SliderPrimitive.Root>
    </div>
  )
})
Slider.displayName = SliderPrimitive.Root.displayName

// Range Slider Component
interface RangeSliderProps {
  min: number
  max: number
  step?: number
  value: [number, number]
  onChange: (value: [number, number]) => void
  formatValue?: (value: number) => string
  label?: string
}

export const RangeSlider = ({
  min,
  max,
  step = 1,
  value,
  onChange,
  formatValue,
  label,
}: RangeSliderProps) => {
  return (
    <div className="space-y-4">
      {label && (
        <div className="flex justify-between">
          <span className="text-sm font-medium text-primary-900">{label}</span>
          <span className="text-sm text-primary-600">
            {formatValue ? formatValue(value[0]) : value[0]} - {formatValue ? formatValue(value[1]) : value[1]}
          </span>
        </div>
      )}
      
      <Slider
        min={min}
        max={max}
        step={step}
        value={value}
        onValueChange={(val) => onChange(val as [number, number])}
        variant="range"
        showLabels
        formatLabel={formatValue}
      />
    </div>
  )
}

export { Slider }
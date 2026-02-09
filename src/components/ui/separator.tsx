// 📦 components/ui/separator.tsx - SIMPLIFIED VERSION
"use client"

import * as React from "react"
import { cn } from "@/lib/utils/cn"

interface SeparatorProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: "horizontal" | "vertical"
  decorative?: boolean
  variant?: "default" | "dashed" | "dotted"
  label?: string
  labelPosition?: "start" | "center" | "end"
}

const Separator = React.forwardRef<HTMLDivElement, SeparatorProps>(
  ({
    className,
    orientation = "horizontal",
    decorative = true,
    variant = "default",
    label,
    labelPosition = "center",
    ...props
  }, ref) => {
    const variantStyles = {
      default: "bg-gray-200",
      dashed: "bg-transparent border-dashed border-gray-300",
      dotted: "bg-transparent border-dotted border-gray-300",
    }

    const borderStyle = variant === "dashed" || variant === "dotted" 
      ? `border-${orientation === "horizontal" ? "t" : "l"}-2 ${variantStyles[variant]}`
      : variantStyles[variant]

    if (label) {
      return (
        <div className={cn(
          "flex items-center",
          orientation === "horizontal" ? "w-full" : "h-full flex-col",
          className
        )}>
          {(labelPosition === "start" || labelPosition === "center") && (
            <div
              ref={ref}
              className={cn(
                "flex-1",
                orientation === "horizontal" ? "h-px" : "w-px",
                borderStyle,
                labelPosition === "center" ? "mr-3" : "hidden"
              )}
              {...props}
            />
          )}

          <span className={cn(
            "px-3 text-sm text-gray-500 whitespace-nowrap",
            orientation === "vertical" && "py-3"
          )}>
            {label}
          </span>

          {(labelPosition === "end" || labelPosition === "center") && (
            <div
              className={cn(
                "flex-1",
                orientation === "horizontal" ? "h-px" : "w-px",
                borderStyle,
                labelPosition === "center" ? "ml-3" : "hidden"
              )}
            />
          )}
        </div>
      )
    }

    return (
      <div
        ref={ref}
        className={cn(
          "shrink-0",
          orientation === "horizontal" ? "h-px w-full" : "h-full w-px",
          borderStyle,
          className
        )}
        {...props}
      />
    )
  }
)
Separator.displayName = "Separator"

// Section Separator Component
interface SectionSeparatorProps {
  title?: string
  description?: string
  action?: React.ReactNode
  variant?: "default" | "accent"
}

export const SectionSeparator = ({
  title,
  description,
  action,
  variant = "default",
}: SectionSeparatorProps) => {
  return (
    <div className={cn(
      "space-y-4",
      variant === "accent" && "bg-blue-50 rounded-lg p-6"
    )}>
      <div className="flex items-center justify-between">
        {(title || description) && (
          <div className="space-y-1">
            {title && (
              <h3 className="text-lg font-semibold text-gray-900">
                {title}
              </h3>
            )}
            {description && (
              <p className="text-sm text-gray-600">
                {description}
              </p>
            )}
          </div>
        )}
        {action}
      </div>
      <Separator />
    </div>
  )
}

export { Separator }
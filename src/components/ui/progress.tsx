// components/ui/progress.tsx
import * as React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: number
  max?: number
  showValue?: boolean
  label?: string
  size?: "sm" | "md" | "lg"
  variant?: "default" | "accent" | "success" | "warning" | "destructive"
  animated?: boolean
  striped?: boolean
}

const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  (
    {
      className,
      value = 0,
      max = 100,
      showValue = false,
      label,
      size = "md",
      variant = "default",
      animated = false,
      striped = false,
      ...props
    },
    ref
  ) => {
    const percentage = Math.min(100, Math.max(0, (value / max) * 100))

    const sizeClasses = {
      sm: "h-2",
      md: "h-3",
      lg: "h-4",
    }

    const variantClasses = {
      default: "bg-primary-600",
      accent: "bg-accent-600",
      success: "bg-green-600",
      warning: "bg-yellow-600",
      destructive: "bg-red-600",
    }

    const stripeStyle = striped
      ? {
          backgroundImage: `linear-gradient(
            45deg,
            rgba(255,255,255,0.15) 25%,
            transparent 25%,
            transparent 50%,
            rgba(255,255,255,0.15) 50%,
            rgba(255,255,255,0.15) 75%,
            transparent 75%,
            transparent
          )`,
          backgroundSize: "1rem 1rem",
        }
      : {}

    return (
      <div className="space-y-2">
        {(label || showValue) && (
          <div className="flex justify-between text-sm">
            {label && <span className="text-primary-700">{label}</span>}
            {showValue && (
              <span className="font-medium">
                {value}/{max} ({percentage.toFixed(1)}%)
              </span>
            )}
          </div>
        )}

        <div
          ref={ref}
          className={cn(
            "relative overflow-hidden rounded-full bg-primary-100",
            sizeClasses[size],
            className
          )}
          {...props}
        >
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className={cn(
              "h-full",
              variantClasses[variant],
              animated && "animate-pulse"
            )}
            style={stripeStyle}
          />
        </div>
      </div>
    )
  }
)

Progress.displayName = "Progress"


// 🔵 Circular Progress
interface CircularProgressProps {
  value: number
  max?: number
  size?: number
  strokeWidth?: number
  showValue?: boolean
  variant?: "default" | "accent" | "success" | "warning" | "destructive"
}

export const CircularProgress = ({
  value,
  max = 100,
  size = 40,
  strokeWidth = 4,
  showValue = true,
  variant = "default",
}: CircularProgressProps) => {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100))
  const radius = (size - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI
  const offset = circumference - (percentage / 100) * circumference

  const variantColors = {
    default: "stroke-primary-600",
    accent: "stroke-accent-600",
    success: "stroke-green-600",
    warning: "stroke-yellow-600",
    destructive: "stroke-red-600",
  }

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={size} height={size} className="-rotate-90">
        <circle
          className="stroke-primary-200"
          strokeWidth={strokeWidth}
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
        <motion.circle
          className={variantColors[variant]}
          strokeWidth={strokeWidth}
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          strokeLinecap="round"
        />
      </svg>

      {showValue && (
        <div className="absolute text-sm font-semibold">
          {Math.round(percentage)}%
        </div>
      )}
    </div>
  )
}

export { Progress }

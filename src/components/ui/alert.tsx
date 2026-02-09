// components/ui/alert.tsx
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { AlertCircle, CheckCircle, Info, XCircle, X } from "lucide-react"
import { motion } from "framer-motion"

const alertVariants = cva(
  "relative w-full rounded-lg border p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground",
  {
    variants: {
      variant: {
        default: "bg-white border-primary-200 text-primary-900 dark:bg-primary-800 dark:border-primary-700 dark:text-white",
        destructive:
          "border-red-200 bg-red-50 text-red-900 dark:border-red-900/30 dark:bg-red-900/20 dark:text-red-300 [&>svg]:text-red-600 dark:[&>svg]:text-red-400",
        warning:
          "border-yellow-200 bg-yellow-50 text-yellow-900 dark:border-yellow-900/30 dark:bg-yellow-900/20 dark:text-yellow-300 [&>svg]:text-yellow-600 dark:[&>svg]:text-yellow-400",
        success:
          "border-green-200 bg-green-50 text-green-900 dark:border-green-900/30 dark:bg-green-900/20 dark:text-green-300 [&>svg]:text-green-600 dark:[&>svg]:text-green-400",
        info:
          "border-blue-200 bg-blue-50 text-blue-900 dark:border-blue-900/30 dark:bg-blue-900/20 dark:text-blue-300 [&>svg]:text-blue-600 dark:[&>svg]:text-blue-400",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

const iconMap = {
  default: Info,
  destructive: XCircle,
  warning: AlertCircle,
  success: CheckCircle,
  info: Info,
}

interface AlertProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof alertVariants> {
  icon?: React.ReactNode
  closable?: boolean
  onClose?: () => void
  dismissible?: boolean
  autoDismiss?: number
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ className, variant, icon, children, closable, onClose, dismissible, autoDismiss, ...props }, ref) => {
    const [isVisible, setIsVisible] = React.useState(true)
    const Icon = icon || iconMap[variant || "default"]

    React.useEffect(() => {
      if (autoDismiss && isVisible) {
        const timer = setTimeout(() => {
          setIsVisible(false)
          onClose?.()
        }, autoDismiss)
        return () => clearTimeout(timer)
      }
    }, [autoDismiss, isVisible, onClose])

    const handleClose = () => {
      setIsVisible(false)
      onClose?.()
    }

    if (!isVisible && dismissible) return null

    return (
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        className={cn(alertVariants({ variant }), className)}
        ref={ref}
        {...props}
      >
        <Icon className="h-4 w-4" />
        <div className="pr-8">
          {children}
        </div>
        {closable && (
          <button
            onClick={handleClose}
            className="absolute right-3 top-3 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </button>
        )}
      </motion.div>
    )
  }
)
Alert.displayName = "Alert"

const AlertTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h5
    ref={ref}
    className={cn("mb-1 font-semibold leading-none tracking-tight", className)}
    {...props}
  />
))
AlertTitle.displayName = "AlertTitle"

const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm [&_p]:leading-relaxed", className)}
    {...props}
  />
))
AlertDescription.displayName = "AlertDescription"

export { Alert, AlertTitle, AlertDescription }
// components/ui/tooltip.tsx
import * as React from "react"
import * as TooltipPrimitive from "@radix-ui/react-tooltip"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

const TooltipProvider = TooltipPrimitive.Provider

const Tooltip = TooltipPrimitive.Root

const TooltipTrigger = TooltipPrimitive.Trigger

const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content> & {
    side?: "top" | "right" | "bottom" | "left"
    align?: "start" | "center" | "end"
    maxWidth?: number
    showArrow?: boolean
    delayDuration?: number
  }
>(({
  className,
  side = "top",
  align = "center",
  maxWidth = 200,
  showArrow = true,
  delayDuration = 100,
  children,
  ...props
}, ref) => (
  <TooltipPrimitive.Content
    ref={ref}
    side={side}
    align={align}
    sideOffset={5}
    className={cn(
      "z-50 overflow-hidden rounded-lg border bg-white px-3 py-1.5 text-sm text-primary-900 shadow-lg animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      "dark:bg-primary-800 dark:text-white dark:border-primary-700",
      className
    )}
    style={{ maxWidth }}
    {...props}
  >
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.1 }}
    >
      {children}
    </motion.div>
    {showArrow && (
      <TooltipPrimitive.Arrow className="fill-white dark:fill-primary-800" />
    )}
  </TooltipPrimitive.Content>
))
TooltipContent.displayName = TooltipPrimitive.Content.displayName

// Rich Tooltip Component
interface RichTooltipProps {
  title?: string
  description: string
  children: React.ReactNode
  icon?: React.ReactNode
  action?: {
    label: string
    onClick: () => void
  }
}

export const RichTooltip = ({
  title,
  description,
  children,
  icon,
  action,
}: RichTooltipProps) => {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={200}>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent className="w-64 p-4">
          <div className="space-y-3">
            {(title || icon) && (
              <div className="flex items-center gap-2">
                {icon && <span className="text-accent-600">{icon}</span>}
                {title && (
                  <h4 className="font-semibold text-primary-900">{title}</h4>
                )}
              </div>
            )}
            <p className="text-sm text-primary-600">{description}</p>
            {action && (
              <button
                onClick={action.onClick}
                className="mt-2 text-sm font-medium text-accent-600 hover:text-accent-700"
              >
                {action.label}
              </button>
            )}
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

// Tooltip with Copy Function
interface CopyTooltipProps {
  text: string
  children: React.ReactNode
  copyMessage?: string
}

export const CopyTooltip = ({
  text,
  children,
  copyMessage = "Copy to clipboard",
}: CopyTooltipProps) => {
  const [copied, setCopied] = React.useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            onClick={handleCopy}
            className="inline-flex items-center"
          >
            {children}
          </button>
        </TooltipTrigger>
        <TooltipContent>
          {copied ? "Copied!" : copyMessage}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

export {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
}
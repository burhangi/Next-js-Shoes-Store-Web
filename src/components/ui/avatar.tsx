// components/ui/avatar.tsx
import * as React from "react"
import * as AvatarPrimitive from "@radix-ui/react-avatar"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

const Avatar = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root> & {
    size?: "xs" | "sm" | "md" | "lg" | "xl"
    status?: "online" | "offline" | "away" | "busy"
    border?: boolean
    hoverEffect?: boolean
  }
>(({ className, size = "md", status, border = false, hoverEffect = false, ...props }, ref) => {
  const sizeClasses = {
    xs: "h-6 w-6 text-xs",
    sm: "h-8 w-8 text-sm",
    md: "h-10 w-10 text-base",
    lg: "h-12 w-12 text-lg",
    xl: "h-16 w-16 text-xl",
  }

  const statusColors = {
    online: "bg-green-500",
    offline: "bg-gray-400",
    away: "bg-yellow-500",
    busy: "bg-red-500",
  }

  return (
    <motion.div
      whileHover={hoverEffect ? { scale: 1.05 } : {}}
      whileTap={hoverEffect ? { scale: 0.95 } : {}}
      className="relative inline-block"
    >
      <AvatarPrimitive.Root
        ref={ref}
        className={cn(
          "relative flex shrink-0 overflow-hidden rounded-full",
          border && "border-2 border-white shadow-lg",
          sizeClasses[size],
          hoverEffect && "cursor-pointer transition-all duration-200 hover:shadow-xl",
          className
        )}
        {...props}
      />
      {status && (
        <span
          className={cn(
            "absolute bottom-0 right-0 block h-2 w-2 rounded-full border-2 border-white",
            statusColors[status]
          )}
          style={{
            bottom: size === "xs" || size === "sm" ? "-1px" : "0",
            right: size === "xs" || size === "sm" ? "-1px" : "0",
            width: size === "xl" ? "12px" : size === "lg" ? "10px" : "8px",
            height: size === "xl" ? "12px" : size === "lg" ? "10px" : "8px",
          }}
        />
      )}
    </motion.div>
  )
})
Avatar.displayName = AvatarPrimitive.Root.displayName

const AvatarImage = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Image>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image> & {
    fallbackDelay?: number
  }
>(({ className, fallbackDelay = 600, ...props }, ref) => {
  const [imageLoaded, setImageLoaded] = React.useState(false)
  const [showFallback, setShowFallback] = React.useState(false)

  React.useEffect(() => {
    const timer = setTimeout(() => {
      if (!imageLoaded) {
        setShowFallback(true)
      }
    }, fallbackDelay)

    return () => clearTimeout(timer)
  }, [imageLoaded, fallbackDelay])

  return (
    <AvatarPrimitive.Image
      ref={ref}
      className={cn(
        "aspect-square h-full w-full object-cover",
        !imageLoaded && "opacity-0",
        className
      )}
      onLoad={() => {
        setImageLoaded(true)
        setShowFallback(false)
      }}
      onError={() => {
        setImageLoaded(false)
        setShowFallback(true)
      }}
      {...props}
    />
  )
})
AvatarImage.displayName = AvatarPrimitive.Image.displayName

const AvatarFallback = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Fallback>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback> & {
    gradient?: boolean
  }
>(({ className, gradient = false, children, ...props }, ref) => (
  <AvatarPrimitive.Fallback
    ref={ref}
    className={cn(
      "flex h-full w-full items-center justify-center rounded-full bg-primary-100 dark:bg-primary-700",
      gradient && "bg-gradient-to-br from-primary-200 to-primary-300 dark:from-primary-600 dark:to-primary-800",
      "font-semibold text-primary-600 dark:text-primary-300",
      className
    )}
    {...props}
  >
    {children || (
      <svg
        className="h-4/5 w-4/5 text-primary-400"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
      </svg>
    )}
  </AvatarPrimitive.Fallback>
))
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName

export { Avatar, AvatarImage, AvatarFallback }
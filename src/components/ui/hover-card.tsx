// components/ui/hover-card.tsx
import * as React from "react"
import * as HoverCardPrimitive from "@radix-ui/react-hover-card"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

const HoverCard = HoverCardPrimitive.Root

const HoverCardTrigger = HoverCardPrimitive.Trigger

const HoverCardContent = React.forwardRef<
  React.ElementRef<typeof HoverCardPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof HoverCardPrimitive.Content> & {
    align?: "start" | "center" | "end"
    sideOffset?: number
    arrow?: boolean
  }
>(({ className, align = "center", sideOffset = 4, arrow = true, children, ...props }, ref) => (
  <HoverCardPrimitive.Portal>
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.15 }}
    >
      <HoverCardPrimitive.Content
        ref={ref}
        align={align}
        sideOffset={sideOffset}
        className={cn(
          "z-50 w-64 rounded-md border bg-white p-4 text-primary-900 shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
          "dark:bg-primary-800 dark:text-white dark:border-primary-700",
          className
        )}
        {...props}
      >
        {children}
        {arrow && (
          <HoverCardPrimitive.Arrow className="fill-white dark:fill-primary-800" />
        )}
      </HoverCardPrimitive.Content>
    </motion.div>
  </HoverCardPrimitive.Portal>
))
HoverCardContent.displayName = HoverCardPrimitive.Content.displayName

// Product Hover Card Component
interface ProductHoverCardProps {
  product: {
    id: string
    name: string
    price: number
    image: string
    description?: string
    rating?: number
    reviewCount?: number
  }
  children: React.ReactNode
}

export const ProductHoverCard = ({ product, children }: ProductHoverCardProps) => {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>{children}</HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className="space-y-3">
          <div className="aspect-square overflow-hidden rounded-lg bg-primary-100">
            <img
              src={product.image}
              alt={product.name}
              className="h-full w-full object-cover"
            />
          </div>
          
          <div>
            <h4 className="font-semibold text-primary-900">{product.name}</h4>
            <p className="mt-1 text-sm text-primary-600">{product.description}</p>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-lg font-bold text-primary-900">
              ${product.price.toFixed(2)}
            </span>
            
            {product.rating && (
              <div className="flex items-center gap-1">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`h-4 w-4 ${
                        i < Math.floor(product.rating!)
                          ? "text-accent-500 fill-accent-500"
                          : "text-primary-300 fill-primary-300"
                      }`}
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="text-sm text-primary-600">
                  ({product.reviewCount})
                </span>
              </div>
            )}
          </div>
          
          <button className="w-full rounded-lg bg-accent-600 py-2 text-sm font-medium text-white hover:bg-accent-700">
            View Details
          </button>
        </div>
      </HoverCardContent>
    </HoverCard>
  )
}

export { HoverCard, HoverCardTrigger, HoverCardContent }
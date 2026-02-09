// components/ui/drawer.tsx
import * as React from "react"
import { Drawer as DrawerPrimitive } from "vaul"
import { cn } from "@/lib/utils"
import { X } from "lucide-react"

const Drawer = ({
  shouldScaleBackground = true,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Root>) => (
  <DrawerPrimitive.Root
    shouldScaleBackground={shouldScaleBackground}
    {...props}
  />
)
Drawer.displayName = "Drawer"

const DrawerTrigger = DrawerPrimitive.Trigger

const DrawerPortal = DrawerPrimitive.Portal

const DrawerClose = DrawerPrimitive.Close

const DrawerOverlay = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Overlay
    ref={ref}
    className={cn("fixed inset-0 z-50 bg-black/80", className)}
    {...props}
  />
))
DrawerOverlay.displayName = DrawerPrimitive.Overlay.displayName

const DrawerContent = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Content> & {
    showCloseButton?: boolean
    position?: "left" | "right" | "top" | "bottom"
    size?: "sm" | "md" | "lg" | "xl" | "full"
  }
>(({ className, children, showCloseButton = true, position = "right", size = "md", ...props }, ref) => {
  const sizeClasses = {
    sm: position === "left" || position === "right" ? "max-w-sm" : "max-h-96",
    md: position === "left" || position === "right" ? "max-w-md" : "max-h-[60vh]",
    lg: position === "left" || position === "right" ? "max-w-lg" : "max-h-[70vh]",
    xl: position === "left" || position === "right" ? "max-w-xl" : "max-h-[80vh]",
    full: position === "left" || position === "right" ? "w-full" : "h-full",
  }

  const positionClasses = {
    left: "inset-y-0 left-0",
    right: "inset-y-0 right-0",
    top: "inset-x-0 top-0",
    bottom: "inset-x-0 bottom-0",
  }

  return (
    <DrawerPortal>
      <DrawerOverlay />
      <DrawerPrimitive.Content
        ref={ref}
        className={cn(
          "fixed z-50 flex flex-col rounded-t-[10px] border bg-background shadow-lg",
          positionClasses[position],
          sizeClasses[size],
          className
        )}
        {...props}
      >
        <div className="mx-auto mt-4 h-2 w-[100px] rounded-full bg-muted" />
        <div className="flex-1 overflow-y-auto p-6">
          {children}
        </div>
        {showCloseButton && (
          <DrawerPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none">
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </DrawerPrimitive.Close>
        )}
      </DrawerPrimitive.Content>
    </DrawerPortal>
  )
})
DrawerContent.displayName = "DrawerContent"

const DrawerHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn("flex flex-col space-y-2 text-center sm:text-left", className)}
    {...props}
  />
)
DrawerHeader.displayName = "DrawerHeader"

const DrawerFooter = ({
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
DrawerFooter.displayName = "DrawerFooter"

const DrawerTitle = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Title
    ref={ref}
    className={cn(
      "text-lg font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
))
DrawerTitle.displayName = DrawerPrimitive.Title.displayName

const DrawerDescription = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Description
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
DrawerDescription.displayName = DrawerPrimitive.Description.displayName

// Shopping Cart Drawer Component
interface CartDrawerProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  items: Array<{
    id: string
    name: string
    price: number
    quantity: number
    image: string
    size?: string
    color?: string
  }>
  onRemoveItem: (id: string) => void
  onUpdateQuantity: (id: string, quantity: number) => void
}

export const CartDrawer = ({
  open,
  onOpenChange,
  items,
  onRemoveItem,
  onUpdateQuantity,
}: CartDrawerProps) => {
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent position="right" size="md">
        <DrawerHeader>
          <DrawerTitle>Shopping Cart</DrawerTitle>
          <DrawerDescription>
            {items.length} item{items.length !== 1 ? 's' : ''} in your cart
          </DrawerDescription>
        </DrawerHeader>
        
        <div className="flex-1 overflow-y-auto">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="text-primary-400 mb-4">🛒</div>
              <p className="text-lg font-medium text-primary-900">
                Your cart is empty
              </p>
              <p className="text-primary-500 mt-2">
                Add some items to get started
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex items-center gap-4 p-4 border-b">
                  <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg bg-primary-100">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-primary-900">{item.name}</h4>
                    {(item.size || item.color) && (
                      <p className="text-sm text-primary-500">
                        {item.size && `Size: ${item.size}`}
                        {item.size && item.color && ' • '}
                        {item.color && `Color: ${item.color}`}
                      </p>
                    )}
                    <p className="font-semibold text-primary-900">
                      ${item.price.toFixed(2)}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
                      className="h-8 w-8 rounded-full border text-primary-600 hover:bg-primary-50"
                    >
                      -
                    </button>
                    <span className="w-8 text-center">{item.quantity}</span>
                    <button
                      onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                      className="h-8 w-8 rounded-full border text-primary-600 hover:bg-primary-50"
                    >
                      +
                    </button>
                    <button
                      onClick={() => onRemoveItem(item.id)}
                      className="ml-4 text-primary-400 hover:text-red-600"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        
        {items.length > 0 && (
          <DrawerFooter>
            <div className="w-full space-y-4">
              <div className="flex justify-between text-lg font-semibold">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => onOpenChange(false)}
                  className="rounded-lg border-2 border-primary-300 py-3 font-medium hover:bg-primary-50"
                >
                  Continue Shopping
                </button>
                <button className="rounded-lg bg-accent-600 py-3 font-medium text-white hover:bg-accent-700">
                  Checkout
                </button>
              </div>
            </div>
          </DrawerFooter>
        )}
      </DrawerContent>
    </Drawer>
  )
}

export {
  Drawer,
  DrawerPortal,
  DrawerOverlay,
  DrawerTrigger,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
}
// components/ui/collapsible.tsx
import * as CollapsiblePrimitive from "@radix-ui/react-collapsible"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"

const Collapsible = CollapsiblePrimitive.Root

const CollapsibleTrigger = React.forwardRef<
  React.ElementRef<typeof CollapsiblePrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof CollapsiblePrimitive.Trigger> & {
    icon?: React.ReactNode
    showIcon?: boolean
  }
>(({ className, children, icon, showIcon = true, ...props }, ref) => (
  <CollapsiblePrimitive.Trigger
    ref={ref}
    className={cn(
      "flex w-full items-center justify-between rounded-lg px-4 py-3 text-left font-medium transition-all hover:bg-primary-50 focus:outline-none focus:ring-2 focus:ring-accent-500",
      "data-[state=open]:bg-primary-50",
      className
    )}
    {...props}
  >
    {children}
    {showIcon && (
      <motion.span
        animate={{ rotate: props["data-state"] === "open" ? 180 : 0 }}
        transition={{ duration: 0.2 }}
        className="text-primary-500"
      >
        {icon || <ChevronDown className="h-4 w-4" />}
      </motion.span>
    )}
  </CollapsiblePrimitive.Trigger>
))
CollapsibleTrigger.displayName = "CollapsibleTrigger"

const CollapsibleContent = React.forwardRef<
  React.ElementRef<typeof CollapsiblePrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof CollapsiblePrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AnimatePresence>
    <CollapsiblePrimitive.Content
      ref={ref}
      className={cn(
        "overflow-hidden data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down",
        className
      )}
      {...props}
    >
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: "auto", opacity: 1 }}
        exit={{ height: 0, opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="px-4 py-3">{children}</div>
      </motion.div>
    </CollapsiblePrimitive.Content>
  </AnimatePresence>
))
CollapsibleContent.displayName = "CollapsibleContent"

// Accordion-like Collapsible Component
interface CollapsibleGroupProps {
  items: Array<{
    id: string
    trigger: React.ReactNode
    content: React.ReactNode
    defaultOpen?: boolean
  }>
  type?: "single" | "multiple"
  className?: string
}

export const CollapsibleGroup = ({
  items,
  type = "single",
  className,
}: CollapsibleGroupProps) => {
  const [openItems, setOpenItems] = React.useState<string[]>(
    items.filter(item => item.defaultOpen).map(item => item.id)
  )

  const handleToggle = (id: string) => {
    if (type === "single") {
      setOpenItems(openItems.includes(id) ? [] : [id])
    } else {
      setOpenItems(
        openItems.includes(id)
          ? openItems.filter(itemId => itemId !== id)
          : [...openItems, id]
      )
    }
  }

  return (
    <div className={cn("space-y-2", className)}>
      {items.map((item) => (
        <Collapsible
          key={item.id}
          open={openItems.includes(item.id)}
          onOpenChange={() => handleToggle(item.id)}
          className="rounded-lg border border-primary-200"
        >
          <CollapsibleTrigger>{item.trigger}</CollapsibleTrigger>
          <CollapsibleContent>{item.content}</CollapsibleContent>
        </Collapsible>
      ))}
    </div>
  )
}

export { Collapsible, CollapsibleTrigger, CollapsibleContent }
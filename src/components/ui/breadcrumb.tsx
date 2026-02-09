import * as React from "react"
import { ChevronRight, Home } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils/cn"

interface BreadcrumbItem {
  label: string
  href?: string
  icon?: React.ReactNode
  isCurrent?: boolean
  onClick?: () => void
}

interface BreadcrumbProps extends React.HTMLAttributes<HTMLDivElement> {
  items: BreadcrumbItem[]
  separator?: React.ReactNode
  showHomeIcon?: boolean
  maxItems?: number
  truncate?: boolean
}

const Breadcrumb = React.forwardRef<HTMLDivElement, BreadcrumbProps>(
  (
    {
      className,
      items,
      separator = <ChevronRight className="h-4 w-4 text-primary-400" />,
      showHomeIcon = true,
      maxItems = 5,
      truncate = true,
      ...props
    },
    ref
  ) => {
    const [isExpanded, setIsExpanded] = React.useState(false)

    // ✅ FIX: Explicit typing prevents union-type errors
    const homeItem: BreadcrumbItem | null = showHomeIcon
      ? {
          label: "Home",
          href: "/",
          icon: <Home className="h-4 w-4" />,
        }
      : null

    // ✅ Ensure consistent array typing
    const allItems: BreadcrumbItem[] = homeItem
      ? [homeItem, ...items]
      : items

    let displayItems: BreadcrumbItem[] = allItems

    if (truncate && allItems.length > maxItems && !isExpanded) {
      const firstItems = allItems.slice(0, 2)
      const lastItems = allItems.slice(-2)
      const hiddenCount = allItems.length - 4

      displayItems = [
        ...firstItems,
        {
          label: `...${hiddenCount} more`,
          onClick: () => setIsExpanded(true),
        },
        ...lastItems,
      ]
    }

    return (
      <nav
        ref={ref}
        aria-label="Breadcrumb"
        className={cn(
          "flex items-center space-x-2 overflow-x-auto py-2",
          className
        )}
        {...props}
      >
        <ol className="flex items-center space-x-2">
          {displayItems.map((item, index) => {
            const isLast = index === displayItems.length - 1
            const isClickable = Boolean(item.href || item.onClick)

            return (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="flex items-center"
              >
                {index > 0 && (
                  <span className="mx-2" aria-hidden="true">
                    {separator}
                  </span>
                )}

                {isClickable ? (
                  item.href ? (
                    <Link
                      href={item.href}
                      aria-current={isLast ? "page" : undefined}
                      className={cn(
                        "flex items-center text-sm font-medium transition-colors",
                        isLast
                          ? "cursor-default text-primary-900 dark:text-white"
                          : "text-primary-600 hover:text-primary-900 dark:text-primary-400 dark:hover:text-white"
                      )}
                    >
                      {item.icon && (
                        <span className="mr-2">{item.icon}</span>
                      )}
                      <span
                        className={cn(
                          "whitespace-nowrap",
                          truncate && "max-w-[120px] truncate"
                        )}
                      >
                        {item.label}
                      </span>
                    </Link>
                  ) : (
                    <button
                      type="button"
                      onClick={item.onClick}
                      aria-current={isLast ? "page" : undefined}
                      className={cn(
                        "flex items-center text-sm font-medium transition-colors",
                        isLast
                          ? "cursor-default text-primary-900 dark:text-white"
                          : "text-primary-600 hover:text-primary-900 dark:text-primary-400 dark:hover:text-white"
                      )}
                    >
                      {item.icon && (
                        <span className="mr-2">{item.icon}</span>
                      )}
                      <span
                        className={cn(
                          "whitespace-nowrap",
                          truncate && "max-w-[120px] truncate"
                        )}
                      >
                        {item.label}
                      </span>
                    </button>
                  )
                ) : (
                  <span
                    className={cn(
                      "flex items-center text-sm font-medium",
                      isLast
                        ? "text-primary-900 dark:text-white"
                        : "text-primary-600 dark:text-primary-400"
                    )}
                  >
                    {item.icon && (
                      <span className="mr-2">{item.icon}</span>
                    )}
                    <span
                      className={cn(
                        "whitespace-nowrap",
                        truncate && "max-w-[120px] truncate"
                      )}
                    >
                      {item.label}
                    </span>
                  </span>
                )}
              </motion.li>
            )
          })}
        </ol>

        {truncate && isExpanded && (
          <button
            type="button"
            onClick={() => setIsExpanded(false)}
            className="ml-4 text-sm text-accent-600 hover:text-accent-700"
          >
            Show less
          </button>
        )}
      </nav>
    )
  }
)

Breadcrumb.displayName = "Breadcrumb"

export { Breadcrumb }

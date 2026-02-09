// components/ui/table.tsx
import * as React from "react"
import { cn } from "@/lib/utils"
import { ChevronUp, ChevronDown, MoreHorizontal } from "lucide-react"
import { motion } from "framer-motion"

const Table = React.forwardRef<
  HTMLTableElement,
  React.HTMLAttributes<HTMLTableElement> & {
    striped?: boolean
    hoverable?: boolean
    compact?: boolean
    bordered?: boolean
  }
>(({ className, striped = true, hoverable = true, compact = false, bordered = false, ...props }, ref) => (
  <div className={cn(
    "relative w-full overflow-auto",
    bordered && "rounded-lg border border-primary-200"
  )}>
    <table
      ref={ref}
      className={cn(
        "w-full caption-bottom text-sm",
        compact ? "text-xs" : "text-sm",
        className
      )}
      {...props}
    />
  </div>
))
Table.displayName = "Table"

const TableHeader = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <thead ref={ref} className={cn("[&_tr]:border-b", className)} {...props} />
))
TableHeader.displayName = "TableHeader"

const TableBody = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement> & {
    loading?: boolean
    skeletonRows?: number
  }
>(({ className, loading, skeletonRows = 5, ...props }, ref) => {
  if (loading) {
    return (
      <tbody ref={ref} className={className}>
        {Array.from({ length: skeletonRows }).map((_, i) => (
          <tr key={i} className="border-b border-primary-100">
            {Array.from({ length: 5 }).map((_, j) => (
              <td key={j} className="p-4">
                <div className="h-4 bg-primary-200 animate-pulse rounded"></div>
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    )
  }

  return (
    <tbody
      ref={ref}
      className={cn("[&_tr:last-child]:border-0", className)}
      {...props}
    />
  )
})
TableBody.displayName = "TableBody"

const TableFooter = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tfoot
    ref={ref}
    className={cn("bg-primary-50 font-medium [&>tr]:last:border-b-0", className)}
    {...props}
  />
))
TableFooter.displayName = "TableFooter"

const TableRow = React.forwardRef<
  HTMLTableRowElement,
  React.HTMLAttributes<HTMLTableRowElement> & {
    hoverable?: boolean
    clickable?: boolean
    onClick?: () => void
  }
>(({ className, hoverable = true, clickable = false, onClick, ...props }, ref) => (
  <motion.tr
    ref={ref}
    className={cn(
      "border-b transition-colors",
      hoverable && "hover:bg-primary-50",
      clickable && "cursor-pointer",
      className
    )}
    onClick={onClick}
    whileHover={clickable ? { scale: 1.01 } : {}}
    transition={{ duration: 0.2 }}
    {...props}
  />
))
TableRow.displayName = "TableRow"

interface TableHeadProps extends React.ThHTMLAttributes<HTMLTableCellElement> {
  sortable?: boolean
  sortDirection?: "asc" | "desc" | null
  onSort?: () => void
  align?: "left" | "center" | "right"
}

const TableHead = React.forwardRef<HTMLTableCellElement, TableHeadProps>(
  ({ className, sortable = false, sortDirection, onSort, align = "left", children, ...props }, ref) => {
    const handleClick = () => {
      if (sortable && onSort) {
        onSort()
      }
    }

    return (
      <th
        ref={ref}
        className={cn(
          "h-12 px-4 text-left align-middle font-medium text-primary-900 [&:has([role=checkbox])]:pr-0",
          sortable && "cursor-pointer select-none hover:bg-primary-50",
          align === "center" && "text-center",
          align === "right" && "text-right",
          className
        )}
        onClick={handleClick}
        {...props}
      >
        <div className={cn(
          "flex items-center",
          align === "center" && "justify-center",
          align === "right" && "justify-end"
        )}>
          {children}
          {sortable && (
            <span className="ml-2 flex flex-col">
              <ChevronUp
                className={cn(
                  "h-3 w-3",
                  sortDirection === "asc" 
                    ? "text-accent-600" 
                    : "text-primary-300"
                )}
              />
              <ChevronDown
                className={cn(
                  "h-3 w-3 -mt-1",
                  sortDirection === "desc" 
                    ? "text-accent-600" 
                    : "text-primary-300"
                )}
              />
            </span>
          )}
        </div>
      </th>
    )
  }
)
TableHead.displayName = "TableHead"

const TableCell = React.forwardRef<
  HTMLTableCellElement,
  React.TdHTMLAttributes<HTMLTableCellElement> & {
    align?: "left" | "center" | "right"
    truncate?: boolean
  }
>(({ className, align = "left", truncate = false, ...props }, ref) => (
  <td
    ref={ref}
    className={cn(
      "p-4 align-middle [&:has([role=checkbox])]:pr-0",
      align === "center" && "text-center",
      align === "right" && "text-right",
      truncate && "truncate max-w-[200px]",
      className
    )}
    {...props}
  />
))
TableCell.displayName = "TableCell"

const TableCaption = React.forwardRef<
  HTMLTableCaptionElement,
  React.HTMLAttributes<HTMLTableCaptionElement>
>(({ className, ...props }, ref) => (
  <caption
    ref={ref}
    className={cn("mt-4 text-sm text-muted-foreground", className)}
    {...props}
  />
))
TableCaption.displayName = "TableCaption"

// Data Table Component
interface Column<T> {
  key: keyof T | string
  header: string
  cell?: (item: T) => React.ReactNode
  sortable?: boolean
  align?: "left" | "center" | "right"
  width?: string
}

interface DataTableProps<T> {
  data: T[]
  columns: Column<T>[]
  keyField: keyof T
  loading?: boolean
  emptyMessage?: string
  onRowClick?: (item: T) => void
  sortConfig?: {
    key: keyof T | string
    direction: "asc" | "desc"
  }
  onSort?: (key: keyof T | string) => void
}

export function DataTable<T>({
  data,
  columns,
  keyField,
  loading = false,
  emptyMessage = "No data available",
  onRowClick,
  sortConfig,
  onSort,
}: DataTableProps<T>) {
  return (
    <Table hoverable>
      <TableHeader>
        <TableRow>
          {columns.map((column) => (
            <TableHead
              key={String(column.key)}
              sortable={column.sortable}
              sortDirection={
                sortConfig?.key === column.key ? sortConfig.direction : null
              }
              onSort={() => column.sortable && onSort?.(column.key)}
              align={column.align}
              style={{ width: column.width }}
            >
              {column.header}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody loading={loading}>
        {!loading && data.length === 0 ? (
          <TableRow>
            <TableCell colSpan={columns.length} align="center" className="h-24">
              {emptyMessage}
            </TableCell>
          </TableRow>
        ) : (
          !loading &&
          data.map((item) => (
            <TableRow
              key={String(item[keyField])}
              clickable={!!onRowClick}
              onClick={() => onRowClick?.(item)}
            >
              {columns.map((column) => (
                <TableCell key={String(column.key)} align={column.align}>
                  {column.cell
                    ? column.cell(item)
                    : String(item[column.key as keyof T] || "-")}
                </TableCell>
              ))}
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  )
}

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
}
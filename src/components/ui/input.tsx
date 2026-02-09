import * as React from "react"
import { cn } from "@/lib/utils/cn"
import { motion } from "framer-motion"
import { Eye, EyeOff, Search, X } from "lucide-react"

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  error?: string
  label?: string
  description?: string
  fullWidth?: boolean
  variant?: "default" | "filled" | "underline"
  size?: "sm" | "md" | "lg"
  clearable?: boolean
  onClear?: () => void
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type,
      leftIcon,
      rightIcon,
      error,
      label,
      description,
      fullWidth = true,
      variant = "default",
      size = "md",
      clearable = false,
      onClear,
      value,
      onChange,
      ...props
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = React.useState(false)
    const [isFocused, setIsFocused] = React.useState(false)

    const defaultValue = props.defaultValue ?? ""

    // ✅ FIX: Explicit string state with guaranteed initial value
    const [internalValue, setInternalValue] = React.useState<string>(
      String(value ?? defaultValue ?? "")
    )

    const sizeClasses = {
      sm: "h-8 px-3 text-sm",
      md: "h-10 px-4 text-base",
      lg: "h-12 px-4 text-lg",
    }

    const variantClasses = {
      default:
        "border border-primary-300 bg-white focus:border-accent-500 focus:ring-2 focus:ring-accent-200",
      filled:
        "border border-transparent bg-primary-50 focus:bg-white focus:border-accent-500 focus:ring-2 focus:ring-accent-200",
      underline:
        "border-0 border-b-2 border-primary-300 bg-transparent rounded-none px-0 focus:border-accent-500 focus:ring-0",
    }

    React.useEffect(() => {
      if (value !== undefined) {
        setInternalValue(String(value))
      }
    }, [value])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value
      setInternalValue(newValue)
      onChange?.(e)
    }

    const handleClear = () => {
      setInternalValue("")
      onClear?.()

      const event = {
        target: { value: "" },
        currentTarget: { value: "" },
      } as React.ChangeEvent<HTMLInputElement>

      onChange?.(event)
    }

    const inputType = type === "password" && showPassword ? "text" : type

    return (
      <div className={cn("space-y-2", fullWidth && "w-full")}>
        {label && (
          <label className="text-sm font-medium text-primary-900">
            {label}
          </label>
        )}

        <motion.div
          animate={isFocused ? { scale: 1.01 } : { scale: 1 }}
          className="relative"
        >
          {leftIcon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-primary-400">
              {leftIcon}
            </div>
          )}

          <input
            ref={ref}
            type={inputType}
            value={internalValue}
            onChange={handleChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className={cn(
              "flex w-full rounded-lg text-primary-900 placeholder:text-primary-400",
              "disabled:cursor-not-allowed disabled:opacity-50",
              "transition-all duration-200 focus:outline-none",
              sizeClasses[size],
              variantClasses[variant],
              error && "border-red-500 focus:border-red-500 focus:ring-red-200",
              leftIcon && "pl-10",
              (rightIcon || type === "password" || clearable) && "pr-10",
              className
            )}
            {...props}
          />

          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
            {clearable && internalValue && (
              <button
                type="button"
                onClick={handleClear}
                className="text-primary-400 hover:text-primary-600"
              >
                <X className="h-4 w-4" />
              </button>
            )}

            {type === "password" && (
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-primary-400 hover:text-primary-600"
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            )}

            {rightIcon && !clearable && type !== "password" && (
              <div className="text-primary-400">{rightIcon}</div>
            )}
          </div>
        </motion.div>

        {(description || error) && (
          <p
            className={cn(
              "text-sm",
              error ? "text-red-600 font-medium" : "text-primary-500"
            )}
          >
            {error || description}
          </p>
        )}
      </div>
    )
  }
)

Input.displayName = "Input"

interface SearchInputProps
  extends Omit<InputProps, "type" | "leftIcon"> {
  onSearch?: (value: string) => void
  debounce?: number
}

export const SearchInput = React.forwardRef<
  HTMLInputElement,
  SearchInputProps
>(({ onSearch, debounce = 300, className, onChange, defaultValue, ...props }, ref) => {
  const [searchValue, setSearchValue] = React.useState<string>(
    String(defaultValue ?? "")
  )

  const timerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchValue(value)
    onChange?.(e)

    if (onSearch) {
      if (timerRef.current) clearTimeout(timerRef.current)
      timerRef.current = setTimeout(() => onSearch(value), debounce)
    }
  }

  React.useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [])

  return (
    <Input
      ref={ref}
      type="search"
      leftIcon={<Search className="h-4 w-4" />}
      placeholder="Search products, brands, categories..."
      value={searchValue}
      onChange={handleChange}
      clearable
      className={cn("rounded-full", className)}
      defaultValue={defaultValue}
      {...props}
    />
  )
})

SearchInput.displayName = "SearchInput"

export { Input }

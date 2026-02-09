// components/ui/textarea.tsx
import * as React from "react"
import { cn } from "@/lib/utils"

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  description?: string
  error?: string
  fullWidth?: boolean
  resize?: "none" | "vertical" | "horizontal" | "both"
  maxLength?: number
  showCount?: boolean
  autoSize?: boolean
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({
    className,
    label,
    description,
    error,
    fullWidth = true,
    resize = "vertical",
    maxLength,
    showCount = false,
    autoSize = false,
    value,
    onChange,
    ...props
  }, ref) => {
    const [internalValue, setInternalValue] = React.useState(value || "")
    const textareaRef = React.useRef<HTMLTextAreaElement>(null)

    const resizeClasses = {
      none: "resize-none",
      vertical: "resize-y",
      horizontal: "resize-x",
      both: "resize",
    }

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const newValue = e.target.value
      setInternalValue(newValue)
      onChange?.(e)

      if (autoSize && textareaRef.current) {
        textareaRef.current.style.height = "auto"
        textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
      }
    }

    const characterCount = maxLength 
      ? `${String(internalValue).length}/${maxLength}`
      : `${String(internalValue).length}`

    return (
      <div className={cn("space-y-2", fullWidth && "w-full")}>
        {label && (
          <label className="text-sm font-medium text-primary-900">
            {label}
          </label>
        )}

        <div className="relative">
          <textarea
            className={cn(
              "flex min-h-[80px] w-full rounded-lg border border-primary-300 bg-white px-3 py-2 text-sm ring-offset-background placeholder:text-primary-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500 disabled:cursor-not-allowed disabled:opacity-50",
              resizeClasses[resize],
              error && "border-red-500 focus-visible:ring-red-500",
              className
            )}
            ref={(node) => {
              if (typeof ref === "function") {
                ref(node)
              } else if (ref) {
                ref.current = node
              }
              textareaRef.current = node
            }}
            value={internalValue}
            onChange={handleChange}
            maxLength={maxLength}
            {...props}
          />

          {showCount && (
            <div className="absolute bottom-2 right-2">
              <span className={cn(
                "text-xs",
                maxLength && String(internalValue).length > maxLength * 0.9
                  ? "text-red-600"
                  : "text-primary-500"
              )}>
                {characterCount}
              </span>
            </div>
          )}
        </div>

        {(description || error) && (
          <p className={cn(
            "text-sm",
            error ? "text-red-600" : "text-primary-500"
          )}>
            {error || description}
          </p>
        )}
      </div>
    )
  }
)
Textarea.displayName = "Textarea"

// Rich Text Editor Component (Basic)
interface RichTextEditorProps extends Omit<TextareaProps, 'value' | 'onChange'> {
  value: string
  onChange: (value: string) => void
  toolbar?: boolean
}

export const RichTextEditor = React.forwardRef<HTMLDivElement, RichTextEditorProps>(
  ({ value, onChange, toolbar = true, className, ...props }, ref) => {
    const handleBold = () => {
      onChange(value + "**bold**")
    }

    const handleItalic = () => {
      onChange(value + "*italic*")
    }

    const handleLink = () => {
      const url = prompt("Enter URL:")
      const text = prompt("Enter link text:")
      if (url && text) {
        onChange(value + `[${text}](${url})`)
      }
    }

    return (
      <div ref={ref} className={cn("space-y-2", className)}>
        {toolbar && (
          <div className="flex items-center gap-1 border-b border-primary-200 pb-2">
            <button
              type="button"
              onClick={handleBold}
              className="p-2 hover:bg-primary-100 rounded"
              aria-label="Bold"
            >
              <strong>B</strong>
            </button>
            <button
              type="button"
              onClick={handleItalic}
              className="p-2 hover:bg-primary-100 rounded"
              aria-label="Italic"
            >
              <em>I</em>
            </button>
            <button
              type="button"
              onClick={handleLink}
              className="p-2 hover:bg-primary-100 rounded"
              aria-label="Insert link"
            >
              🔗
            </button>
          </div>
        )}

        <Textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          {...props}
        />
      </div>
    )
  }
)
RichTextEditor.displayName = "RichTextEditor"

export { Textarea }
// components/ui/sonner.tsx
"use client"

import { useTheme } from "next-themes"
import { Toaster as SonnerToaster, toast } from "sonner"
import { cn } from "@/lib/utils"
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from "lucide-react"

type ToasterProps = React.ComponentProps<typeof SonnerToaster>

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <SonnerToaster
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast: cn(
            "group toast group-[.toaster]:bg-white group-[.toaster]:text-primary-900",
            "group-[.toaster]:border-primary-200 group-[.toaster]:shadow-lg",
            "dark:group-[.toaster]:bg-primary-800 dark:group-[.toaster]:text-white",
            "dark:group-[.toaster]:border-primary-700"
          ),
          description: "group-[.toast]:text-primary-600 dark:group-[.toast]:text-primary-400",
          actionButton:
            "group-[.toast]:bg-accent-600 group-[.toast]:text-white",
          cancelButton:
            "group-[.toast]:bg-primary-100 group-[.toast]:text-primary-900",
        },
      }}
      {...props}
    />
  )
}

// Toast Hook
export const useToast = () => {
  const showToast = (
    type: "success" | "error" | "warning" | "info",
    message: string,
    description?: string,
    options?: {
      duration?: number
      action?: {
        label: string
        onClick: () => void
      }
      dismissible?: boolean
    }
  ) => {
    const icons = {
      success: <CheckCircle className="h-5 w-5 text-green-600" />,
      error: <AlertCircle className="h-5 w-5 text-red-600" />,
      warning: <AlertTriangle className="h-5 w-5 text-yellow-600" />,
      info: <Info className="h-5 w-5 text-blue-600" />,
    }

    const toastConfig = {
      duration: options?.duration || 5000,
      action: options?.action,
      dismissible: options?.dismissible || true,
      icon: icons[type],
    }

    switch (type) {
      case "success":
        toast.success(message, { ...toastConfig, description })
        break
      case "error":
        toast.error(message, { ...toastConfig, description })
        break
      case "warning":
        toast.warning(message, { ...toastConfig, description })
        break
      case "info":
        toast.info(message, { ...toastConfig, description })
        break
    }
  }

  return {
    success: (message: string, description?: string, options?: any) =>
      showToast("success", message, description, options),
    error: (message: string, description?: string, options?: any) =>
      showToast("error", message, description, options),
    warning: (message: string, description?: string, options?: any) =>
      showToast("warning", message, description, options),
    info: (message: string, description?: string, options?: any) =>
      showToast("info", message, description, options),
    dismiss: toast.dismiss,
  }
}

// Custom Toast Component
interface CustomToastProps {
  id: number | string
  title: string
  description?: string
  type: "success" | "error" | "warning" | "info"
  onClose: () => void
}

export const CustomToast = ({
  title,
  description,
  type,
  onClose,
}: Omit<CustomToastProps, "id">) => {
  const typeConfig = {
    success: {
      icon: CheckCircle,
      bg: "bg-green-50",
      border: "border-green-200",
      text: "text-green-800",
      iconColor: "text-green-600",
    },
    error: {
      icon: AlertCircle,
      bg: "bg-red-50",
      border: "border-red-200",
      text: "text-red-800",
      iconColor: "text-red-600",
    },
    warning: {
      icon: AlertTriangle,
      bg: "bg-yellow-50",
      border: "border-yellow-200",
      text: "text-yellow-800",
      iconColor: "text-yellow-600",
    },
    info: {
      icon: Info,
      bg: "bg-blue-50",
      border: "border-blue-200",
      text: "text-blue-800",
      iconColor: "text-blue-600",
    },
  }

  const config = typeConfig[type]
  const Icon = config.icon

  return (
    <div
      className={cn(
        "flex items-start gap-3 rounded-lg border p-4 shadow-lg",
        config.bg,
        config.border
      )}
    >
      <Icon className={cn("h-5 w-5 flex-shrink-0", config.iconColor)} />
      <div className="flex-1">
        <h3 className={cn("font-semibold", config.text)}>{title}</h3>
        {description && (
          <p className={cn("mt-1 text-sm", config.text)}>{description}</p>
        )}
      </div>
      <button
        onClick={onClose}
        className="ml-4 text-primary-400 hover:text-primary-600"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  )
}

export { Toaster, toast }
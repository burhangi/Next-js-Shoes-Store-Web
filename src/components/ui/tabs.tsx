// components/ui/tabs.tsx
"use client";

import * as React from "react";
import { cn } from "@/lib/utils/cn";
import { motion, AnimatePresence } from "framer-motion";

const TabsContext = React.createContext<{
  activeTab: string;
  setActiveTab: (value: string) => void;
} | null>(null);

const Tabs = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    value?: string;
    defaultValue?: string;
    onValueChange?: (value: string) => void;
    orientation?: "horizontal" | "vertical";
  }
>(({ className, value, defaultValue, onValueChange, children, ...props }, ref) => {
  const [activeTab, setActiveTabState] = React.useState(defaultValue || "");

  const handleTabChange = React.useCallback((newValue: string) => {
    setActiveTabState(newValue);
    onValueChange?.(newValue);
  }, [onValueChange]);

  const contextValue = React.useMemo(() => ({
    activeTab: value !== undefined ? value : activeTab,
    setActiveTab: handleTabChange,
  }), [value, activeTab, handleTabChange]);

  return (
    <TabsContext.Provider value={contextValue}>
      <div ref={ref} className={cn("", className)} {...props}>
        {children}
      </div>
    </TabsContext.Provider>
  );
});
Tabs.displayName = "Tabs";

const TabsList = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    variant?: "default" | "pills" | "underline";
    fullWidth?: boolean;
  }
>(({ className, variant = "default", fullWidth = false, ...props }, ref) => {
  const variantClasses = {
    default: "inline-flex h-10 items-center justify-center rounded-lg bg-primary-100 p-1 text-primary-500",
    pills: "inline-flex h-10 items-center justify-center rounded-full bg-primary-100 p-1 text-primary-500",
    underline: "inline-flex h-10 items-center justify-center border-b border-primary-200 text-primary-500",
  };

  return (
    <div
      ref={ref}
      className={cn(
        variantClasses[variant],
        fullWidth && "w-full",
        className
      )}
      {...props}
    />
  );
});
TabsList.displayName = "TabsList";

const TabsTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    value: string;
    icon?: React.ReactNode;
    badge?: React.ReactNode;
  }
>(({ className, value, icon, badge, children, ...props }, ref) => {
  const context = React.useContext(TabsContext);
  if (!context) throw new Error("TabsTrigger must be used within Tabs");

  const isActive = context.activeTab === value;

  return (
    <button
      ref={ref}
      type="button"
      role="tab"
      aria-selected={isActive}
      onClick={() => context.setActiveTab(value)}
      data-state={isActive ? "active" : "inactive"}
      className={cn(
        "inline-flex items-center justify-center whitespace-nowrap px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
        "data-[state=active]:text-accent-600 data-[state=active]:bg-white data-[state=active]:shadow-sm",
        className
      )}
      {...props}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {children}
      {badge && <span className="ml-2">{badge}</span>}
    </button>
  );
});
TabsTrigger.displayName = "TabsTrigger";

const TabsContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    value: string;
  }
>(({ className, value, children, ...props }, ref) => {
  const context = React.useContext(TabsContext);
  if (!context) throw new Error("TabsContent must be used within Tabs");

  if (context.activeTab !== value) return null;

  return (
    <div
      ref={ref}
      role="tabpanel"
      className={cn(
        "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
});
TabsContent.displayName = "TabsContent";

// Animated Tabs Component for easier usage
interface AnimatedTabsProps {
  tabs: Array<{
    value: string;
    label: string;
    icon?: React.ReactNode;
    badge?: React.ReactNode;
    content: React.ReactNode;
  }>;
  defaultValue?: string;
  variant?: "default" | "pills" | "underline";
  orientation?: "horizontal" | "vertical";
}

export const AnimatedTabs = ({
  tabs,
  defaultValue,
  variant = "default",
  orientation = "horizontal",
}: AnimatedTabsProps) => {
  const [activeTab, setActiveTab] = React.useState(defaultValue || tabs[0].value);

  return (
    <Tabs
      defaultValue={activeTab}
      onValueChange={setActiveTab}
      className={cn(
        orientation === "vertical" && "flex gap-4"
      )}
    >
      <TabsList variant={variant} className={cn(
        orientation === "vertical" && "flex-col h-auto"
      )}>
        {tabs.map((tab) => (
          <TabsTrigger
            key={tab.value}
            value={tab.value}
            icon={tab.icon}
            badge={tab.badge}
          >
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>
      
      <div className="w-full">
        <AnimatePresence mode="wait">
          {tabs.map((tab) => (
            tab.value === activeTab && (
              <TabsContent key={tab.value} value={tab.value}>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  {tab.content}
                </motion.div>
              </TabsContent>
            )
          ))}
        </AnimatePresence>
      </div>
    </Tabs>
  );
};

export { Tabs, TabsList, TabsTrigger, TabsContent };
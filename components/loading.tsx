"use client"

import { motion } from "framer-motion"
import { Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

interface LoadingProps {
  variant?: "spinner" | "dots" | "pulse" | "bars" | "circle"
  size?: "sm" | "md" | "lg" | "xl"
  text?: string
  fullScreen?: boolean
  className?: string
}

export function Loading({ variant = "spinner", size = "md", text, fullScreen = false, className }: LoadingProps) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-8 h-8",
    lg: "w-12 h-12",
    xl: "w-16 h-16",
  }

  const content = (
    <div className={cn("flex flex-col items-center justify-center gap-3", fullScreen && "min-h-screen", className)}>
      {variant === "spinner" && (
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          className={cn(sizeClasses[size])}
        >
          <Loader2 className="w-full h-full text-primary" />
        </motion.div>
      )}

      {variant === "dots" && (
        <div className="flex items-center gap-2">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.3, 1, 0.3],
              }}
              transition={{
                duration: 1.2,
                repeat: Number.POSITIVE_INFINITY,
                delay: i * 0.2,
                ease: "easeInOut",
              }}
              className={cn(
                "rounded-full bg-primary",
                size === "sm" && "w-2 h-2",
                size === "md" && "w-3 h-3",
                size === "lg" && "w-4 h-4",
                size === "xl" && "w-5 h-5",
              )}
            />
          ))}
        </div>
      )}

      {variant === "pulse" && (
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 1.5,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
          className={cn("rounded-full bg-primary", sizeClasses[size])}
        />
      )}

      {variant === "bars" && (
        <div className="flex items-end gap-1.5">
          {[0, 1, 2, 3].map((i) => (
            <motion.div
              key={i}
              animate={{
                scaleY: [1, 2, 1],
              }}
              transition={{
                duration: 1,
                repeat: Number.POSITIVE_INFINITY,
                delay: i * 0.1,
                ease: "easeInOut",
              }}
              className={cn(
                "bg-primary origin-bottom",
                size === "sm" && "w-1 h-4",
                size === "md" && "w-1.5 h-6",
                size === "lg" && "w-2 h-8",
                size === "xl" && "w-3 h-12",
              )}
            />
          ))}
        </div>
      )}

      {variant === "circle" && (
        <div className={cn("relative", sizeClasses[size])}>
          <svg className="w-full h-full" viewBox="0 0 50 50">
            <motion.circle
              cx="25"
              cy="25"
              r="20"
              fill="none"
              stroke="currentColor"
              strokeWidth="4"
              className="text-muted"
            />
            <motion.circle
              cx="25"
              cy="25"
              r="20"
              fill="none"
              stroke="currentColor"
              strokeWidth="4"
              strokeLinecap="round"
              className="text-primary"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: [0, 0.8, 0], rotate: 360 }}
              transition={{
                pathLength: { duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
                rotate: { duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
              }}
              style={{ transformOrigin: "50% 50%" }}
            />
          </svg>
        </div>
      )}

      {text && (
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-sm text-muted-foreground mt-2">
          {text}
        </motion.p>
      )}
    </div>
  )

  if (fullScreen) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center"
      >
        {content}
      </motion.div>
    )
  }

  return content
}

// Loading Overlay Component
export function LoadingOverlay({ text }: { text?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="bg-card border border-border rounded-lg p-8 shadow-lg"
      >
        <Loading variant="circle" size="lg" text={text} />
      </motion.div>
    </motion.div>
  )
}

// Skeleton Loader Component
export function LoadingSkeleton({
  className,
  variant = "default",
}: {
  className?: string
  variant?: "default" | "card" | "text" | "avatar" | "button"
}) {
  const baseClasses = "animate-pulse bg-muted rounded"

  const variantClasses = {
    default: "",
    card: "h-48 w-full",
    text: "h-4 w-full",
    avatar: "h-12 w-12 rounded-full",
    button: "h-10 w-24",
  }

  return <div className={cn(baseClasses, variantClasses[variant], className)} />
}

// Product Card Skeleton
export function ProductCardSkeleton() {
  return (
    <div className="space-y-4">
      <LoadingSkeleton variant="card" />
      <LoadingSkeleton variant="text" className="w-3/4" />
      <LoadingSkeleton variant="text" className="w-1/2" />
      <LoadingSkeleton variant="button" className="w-full" />
    </div>
  )
}

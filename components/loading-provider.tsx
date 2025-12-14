"use client"

import { createContext, useContext, useState, useCallback, type ReactNode } from "react"
import { AnimatePresence } from "framer-motion"
import { LoadingOverlay } from "./loading"

interface LoadingContextType {
  isLoading: boolean
  startLoading: (text?: string) => void
  stopLoading: () => void
  loadingText?: string
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined)

export function LoadingProvider({ children }: { children: ReactNode }) {
  const [isLoading, setIsLoading] = useState(false)
  const [loadingText, setLoadingText] = useState<string | undefined>()

  const startLoading = useCallback((text?: string) => {
    setLoadingText(text)
    setIsLoading(true)
  }, [])

  const stopLoading = useCallback(() => {
    setIsLoading(false)
    setLoadingText(undefined)
  }, [])

  return (
    <LoadingContext.Provider value={{ isLoading, startLoading, stopLoading, loadingText }}>
      {children}
      <AnimatePresence>{isLoading && <LoadingOverlay text={loadingText} />}</AnimatePresence>
    </LoadingContext.Provider>
  )
}

export function useLoading() {
  const context = useContext(LoadingContext)
  if (context === undefined) {
    throw new Error("useLoading must be used within a LoadingProvider")
  }
  return context
}

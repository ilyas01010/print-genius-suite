
import { useToast } from "@/hooks/use-toast"
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast"
import { useIsMobile } from "@/hooks/use-mobile"
import { useEffect, useState } from "react"

export function Toaster() {
  const { toasts } = useToast()
  const isMobile = useIsMobile()
  
  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, ...props }) {
        return (
          <Toast 
            key={id} 
            {...props}
            className={`${props.className || ''} ${isMobile ? 'max-w-[calc(100%-32px)]' : ''} group relative`}
          >
            {/* Visual timer indicator */}
            <div className="absolute bottom-0 left-0 h-1 bg-primary/20 w-full">
              <div className="h-full bg-primary animate-[shrink_5s_linear_1]" />
            </div>
            <div className="grid gap-1">
              {title && <ToastTitle>{title}</ToastTitle>}
              {description && (
                <ToastDescription>{description}</ToastDescription>
              )}
            </div>
            {action}
            <ToastClose />
          </Toast>
        )
      })}
      <ToastViewport className={isMobile ? "p-4" : ""} />
    </ToastProvider>
  )
}

"use client"

import React from "react"
import { Stethoscope } from "lucide-react"

type AppHeaderProps = {
  title?: string
  subtitle?: string
  iconNode?: React.ReactNode
  className?: string
  align?: "left" | "center"
}

export function AppHeader({ title, subtitle, iconNode, className, align = "left" }: AppHeaderProps) {
  return (
    <header aria-label="Application header" className={`w-full ${className ?? ""}`}>
      <div className="mx-auto max-w-2xl px-2 md:px-0">
        <div className={`flex items-center gap-3 md:gap-4 py-2 md:py-3 ${align === "center" ? "justify-center" : ""}`}>
          <div className="flex items-center justify-center h-10 w-10 md:h-12 md:w-12 rounded-xl">
            {iconNode ? (
              iconNode
            ) : (
              <Stethoscope aria-hidden className="h-7 w-7 md:h-8 md:w-8 text-black" strokeWidth={2} />
            )}
          </div>
          {(title || subtitle) && (
            <div className={`min-w-0 ${align === "center" ? "text-center" : ""}`}>
              {title && (
                <div className="text-base md:text-lg font-semibold text-foreground tracking-tight">
                  {title}
                </div>
              )}
              {subtitle && (
                <div className="text-xs md:text-sm text-muted-foreground">
                  {subtitle}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
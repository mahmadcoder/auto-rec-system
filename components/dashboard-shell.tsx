import type React from "react"

export function DashboardShell({ children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className="flex-1 space-y-8 overflow-y-auto" {...props}>
      {children}
    </div>
  )
}


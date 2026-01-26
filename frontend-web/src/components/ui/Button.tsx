import * as React from "react"
import { cn } from "../../lib/utils"

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'default' | 'outline' | 'ghost' | 'danger'
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = 'default', ...props }, ref) => {
        return (
            <button
                ref={ref}
                className={cn(
                    "inline-flex items-center justify-center rounded-lg text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 disabled:opacity-50 disabled:pointer-events-none ring-offset-background",
                    "h-10 py-2 px-4 w-full",
                    {
                        "bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg shadow-indigo-500/30": variant === 'default',
                        "border border-slate-700 bg-transparent hover:bg-slate-800 text-slate-200": variant === 'outline',
                        "hover:bg-slate-800 text-slate-200": variant === 'ghost',
                        "bg-red-600 text-white hover:bg-red-700": variant === 'danger'
                    },
                    className
                )}
                {...props}
            />
        )
    }
)
Button.displayName = "Button"

export { Button }

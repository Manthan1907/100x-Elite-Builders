
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

export const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground",
        success: 
          "border-transparent bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100",
        winner: 
          "border-transparent bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100",
        sponsor: 
          "border-transparent bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100",
        top: 
          "border-transparent bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export type BadgeVariant = NonNullable<VariantProps<typeof badgeVariants>["variant"]>

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  variant?: BadgeVariant;
}

function Badge({ className, variant = "default", ...props }: BadgeProps) {
  // Ensure variant is a valid option
  const safeVariant = (variant as BadgeVariant) || "default";
  return (
    <div className={cn(badgeVariants({ variant: safeVariant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }

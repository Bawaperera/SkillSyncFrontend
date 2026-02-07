import { HTMLAttributes, forwardRef } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const badgeVariants = cva(
  'inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold',
  {
    variants: {
      variant: {
        primary: 'bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300',
        success: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300',
        warning: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300',
        danger: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300',
        info: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300',
        gray: 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300',
      },
    },
    defaultVariants: {
      variant: 'primary',
    },
  }
)

export interface BadgeProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

const Badge = forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(badgeVariants({ variant }), className)}
        {...props}
      />
    )
  }
)
Badge.displayName = 'Badge'

export default Badge

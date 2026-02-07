import { ButtonHTMLAttributes, forwardRef } from 'react'
import Link from 'next/link'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-xl px-6 py-3 text-sm font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2',
  {
    variants: {
      variant: {
        primary:
          'text-white bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 shadow-lg shadow-primary-500/25 hover:shadow-xl hover:shadow-primary-500/30 focus:ring-primary-500',
        secondary:
          'text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-primary-600 hover:bg-gray-50 dark:hover:bg-gray-700 focus:ring-primary-500',
        ghost:
          'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 focus:ring-primary-500',
        outline:
          'text-primary-600 dark:text-primary-400 border-2 border-primary-600 dark:border-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/20 focus:ring-primary-500',
      },
      size: {
        sm: 'px-4 py-2 text-xs',
        md: 'px-6 py-3 text-sm',
        lg: 'px-8 py-4 text-base',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
)

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  href?: string
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild, href, children, ...props }, ref) => {
    const classes = cn(buttonVariants({ variant, size, className }))

    if (asChild && href) {
      return (
        <Link href={href} className={classes}>
          {children}
        </Link>
      )
    }

    return (
      <button
        className={classes}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    )
  }
)
Button.displayName = 'Button'

export default Button

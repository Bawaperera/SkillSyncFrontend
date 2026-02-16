import { HTMLAttributes, forwardRef } from 'react'
import { cn } from '@/lib/utils'

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  glow?: boolean
  glass?: boolean
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, glow = false, glass = false, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'rounded-2xl border p-6',
          glow
            ? 'bg-white border-gray-200 shadow-xl shadow-primary-500/10'
            : 'bg-white border-gray-200 shadow-lg',
          glass && 'backdrop-blur-xl bg-white/70 border-white/20',
          className
        )}
        {...props}
      />
    )
  }
)
Card.displayName = 'Card'

export default Card

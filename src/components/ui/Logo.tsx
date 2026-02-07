import Link from 'next/link'
import { Brain } from 'lucide-react'

interface LogoProps {
  href?: string
  size?: 'sm' | 'md' | 'lg'
  showText?: boolean
  className?: string
}

export default function Logo({ href = '/', size = 'md', showText = true, className = '' }: LogoProps) {
  const sizeClasses = {
    sm: { icon: 'w-4 h-4', iconContainer: 'p-1.5', text: 'text-lg' },
    md: { icon: 'w-6 h-6', iconContainer: 'p-2', text: 'text-2xl' },
    lg: { icon: 'w-8 h-8', iconContainer: 'p-3', text: 'text-3xl' },
  }

  const classes = sizeClasses[size]

  const content = (
    <div className={`flex items-center gap-2 group ${className}`}>
      <div className={`${classes.iconContainer} rounded-xl bg-gradient-to-br from-primary-600 to-secondary-600 group-hover:scale-110 transition-transform duration-200`}>
        <Brain className={`${classes.icon} text-white`} />
      </div>
      {showText && (
        <span className={`${classes.text} font-display font-bold gradient-text`}>
          SkillSync
        </span>
      )}
    </div>
  )

  if (href) {
    return <Link href={href}>{content}</Link>
  }

  return content
}

import { cn } from '@/lib/utils'

interface CardProps {
  children: React.ReactNode
  className?: string
  hover?: boolean
  onClick?: () => void
}

export default function Card({ children, className, hover, onClick }: CardProps) {
  return (
    <div
      onClick={onClick}
      className={cn(
        'bg-surface border border-border rounded-card p-6 shadow-[0_1px_3px_rgba(0,0,0,0.06)]',
        hover && 'transition-all duration-200 hover:shadow-[0_4px_12px_rgba(0,0,0,0.10)] hover:-translate-y-0.5',
        onClick && 'cursor-pointer',
        className
      )}
    >
      {children}
    </div>
  )
}

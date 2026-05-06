import { cn } from '@/lib/utils'

type BadgeVariant = 'pending' | 'confirmed' | 'completed' | 'cancelled' | 'default'

interface BadgeProps {
  variant?: BadgeVariant
  children: React.ReactNode
  className?: string
}

const variantClasses: Record<BadgeVariant, string> = {
  pending: 'bg-[#FEF9C3] text-[#854D0E]',
  confirmed: 'bg-[#DBEAFE] text-[#1E40AF]',
  completed: 'bg-[#DCFCE7] text-[#166534]',
  cancelled: 'bg-[#FEE2E2] text-[#991B1B]',
  default: 'bg-surface-hover text-text-muted',
}

const statusLabels: Record<string, string> = {
  pending: '대기 중',
  confirmed: '확정',
  completed: '완료',
  cancelled: '취소',
}

export default function Badge({ variant = 'default', children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
        variantClasses[variant],
        className
      )}
    >
      {children}
    </span>
  )
}

export function LessonStatusBadge({ status }: { status: string }) {
  return (
    <Badge variant={status as BadgeVariant}>
      {statusLabels[status] ?? status}
    </Badge>
  )
}

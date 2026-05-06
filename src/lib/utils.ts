export function cn(...classes: (string | undefined | false | null)[]): string {
  return classes.filter(Boolean).join(' ')
}

export function formatDate(date: Date | string): string {
  return new Date(date).toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export function formatDateTime(date: Date | string): string {
  return new Date(date).toLocaleString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export function getMinLessonDate(): Date {
  const d = new Date()
  d.setDate(d.getDate() + 2)
  d.setHours(0, 0, 0, 0)
  return d
}

import { cn } from '@/lib/utils'

type Props = {
  className?: string
}

export function Spinner({ className }: Props) {
  return (
    <div
      className={cn(
        'inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite] text-primary',
        className,
      )}
      role="status"
    >
      <span className="sr-only">Loading...</span>
    </div>
  )
}

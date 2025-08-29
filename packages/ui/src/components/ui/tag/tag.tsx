import { cn } from '@/lib/utils'
type Props = {
  children: React.ReactNode
  className?: string
}

export function Tag({ children, className }: Props) {
  return (
    <div
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-[13px] border border-white/15 bg-white/5 px-2 py-[6px] text-xs font-semibold uppercase tracking-wider text-[#FFF172] w-fit',
        className,
      )}
    >
      {children}
    </div>
  )
}

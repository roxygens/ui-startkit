import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const badgeVariants = cva(
  'bg-[var(--primary)] font-inter font-semibold text-white flex-none order-0 grow-0',
  {
    variants: {
      size: {
        lg: 'px-[.38rem] py-[.38rem] rounded-[1.5rem] text-[.75rem] leading-[.95rem]',
      },
    },
    defaultVariants: {
      size: 'lg',
    },
  },
)

type Props = {
  value: number
  className?: string
  size?: VariantProps<typeof badgeVariants>['size']
}

export function Badge({ value, size, className }: Props) {
  return (
    <span
      style={{
        backgroundImage: `linear-gradient(
          90deg,
          var(--primary) 0%,
          color-mix(in srgb, var(--primary) 65%, black) 100%
        )`,
      }}
      className={cn(badgeVariants({ size, className }))}
    >
      -{value}%
    </span>
  )
}

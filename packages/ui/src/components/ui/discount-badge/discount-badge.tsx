import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const discountBadgeVariants = cva(
  'bg-[var(--primary)] font-inter font-semibold text-white flex-none order-0 grow-0',
  {
    variants: {
      size: {
        lg: 'px-[12px] py-[6px] rounded-[24px] text-[12px] leading-[15px]',
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
  size: VariantProps<typeof discountBadgeVariants>['size']
}

export function DiscountBadge({ value, size, className }: Props) {
  return (
    <span
      style={{
        backgroundImage: `linear-gradient(
          90deg,
          var(--primary) 0%,
          color-mix(in srgb, var(--primary) 65%, black) 100%
        )`,
      }}
      className={cn(discountBadgeVariants({ size, className }))}
    >
      -{value}%
    </span>
  )
}

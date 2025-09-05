import { cn } from '@/lib/utils'
import { cva, type VariantProps } from 'class-variance-authority'

const badgeVariants = cva(
  'inline-flex items-center justify-center gap-2 border font-semibold uppercase tracking-wider w-fit',
  {
    variants: {
      size: {
        md: 'text-[.75rem] px-[.75rem] py-[.25rem] rounded-[.815rem]',
      },
      variant: {
        success: 'bg-[#54DC621A] border-[#54DC6259] text-[#54DC62]',
        info: 'bg-[#3BE2C21A] border-[#3BE2C259] text-[#3BE2C2]',
        warning: 'text-[#FFF172] border-white/15 bg-white/5',
        danger: 'bg-[#FF99211A] border-[#FF992159] text-[#FF9921]',
        critical: 'bg-[#FFFFFF0D] border-[#FFFFFF26] text-[#FF6868]',
      },
    },
    defaultVariants: {
      size: 'md',
      variant: 'info',
    },
  },
)

type Props = {
  children: React.ReactNode
  className?: string
}

export function Badge({
  children,
  className,
  size,
  variant,
}: Props & VariantProps<typeof badgeVariants>) {
  return <div className={cn(badgeVariants({ size, variant, className }))}>{children}</div>
}

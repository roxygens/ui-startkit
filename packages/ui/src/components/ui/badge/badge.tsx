import { cn } from '@/lib/utils'
import { cva, type VariantProps } from 'class-variance-authority'

const badgeVariants = cva(
  'inline-flex items-center justify-center gap-2 border font-semibold uppercase tracking-wider w-fit',
  {
    variants: {
      size: {
        sm: 'text-[0.625rem] px-[0.5rem] py-[0.125rem] rounded-[0.625rem]',
        md: 'text-[0.75rem] px-[0.75rem] py-[0.25rem] rounded-[0.815rem]',
        lg: 'text-[0.875rem] px-[1rem] py-[0.375rem] rounded-[1rem]',
        xl: 'text-[1rem] px-[1.25rem] py-[0.5rem] rounded-[1.25rem]',
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

import { cn } from '@/lib/utils'
import { cva, type VariantProps } from 'class-variance-authority'

const tagVariants = cva(
  'inline-flex items-center justify-center gap-2 rounded-[1rem] border border-white/15 bg-white/5  font-semibold uppercase tracking-wider text-[#FFF172] w-fit',
  {
    variants: {
      size: {
        md: 'text-[.6rem] px-[.66rem] py-[.22rem]',
        lg: 'px-[1rem] py-[.25rem] text-xs',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  },
)

type Props = {
  children: React.ReactNode
  className?: string
}

export function Tag({ children, className, size }: Props & VariantProps<typeof tagVariants>) {
  return <div className={cn(tagVariants({ size, className }))}>{children}</div>
}

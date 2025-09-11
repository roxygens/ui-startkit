import { type ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { cva, type VariantProps } from 'class-variance-authority'

type TooltipProps = {
  children: ReactNode
  description: string
  title?: string
  className?: string
}

const tooltipVariants = cva(
  'absolute p-[0.75rem] rounded-md bg-neutral-800 text-xs opacity-0 group-hover:opacity-100 transition pointer-events-none z-10 whitespace-normal flex flex-col gap-1',
  {
    variants: {
      position: {
        top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
        bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
        left: 'right-full top-1/2 -translate-y-1/2 mr-2',
        right: 'left-full top-1/2 -translate-y-1/2 ml-2',
      },
    },
    defaultVariants: {
      position: 'top',
    },
  },
)

type Props = TooltipProps & VariantProps<typeof tooltipVariants>

export function Tooltip({ children, description, title, className, position = 'top' }: Props) {
  return (
    <div className="relative inline-block group">
      {children}
      <div
        className={cn(tooltipVariants({ position }), 'max-w-[18.75rem]', 'w-max', className)}
        role="tooltip"
      >
        {title && (
          <div className="font-semibold text-[0.75rem] leading-[1rem] text-white">{title}</div>
        )}
        <div className="font-inter font-normal  text-[0.75rem] leading-[1rem] text-gray-50">
          {description}
        </div>
      </div>
    </div>
  )
}

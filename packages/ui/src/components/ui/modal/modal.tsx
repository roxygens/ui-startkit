'use client'

import * as React from 'react'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import { XIcon } from 'lucide-react'

import { cn } from '@/lib/utils'

function Dialog({ ...props }: React.ComponentProps<typeof DialogPrimitive.Root>) {
  return <DialogPrimitive.Root data-slot="dialog" {...props} />
}

function DialogTrigger({ ...props }: React.ComponentProps<typeof DialogPrimitive.Trigger>) {
  return <DialogPrimitive.Trigger data-slot="dialog-trigger" {...props} />
}

function DialogPortal({ ...props }: React.ComponentProps<typeof DialogPrimitive.Portal>) {
  return <DialogPrimitive.Portal data-slot="dialog-portal" {...props} />
}

function DialogOverlay({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Overlay>) {
  return (
    <DialogPrimitive.Overlay
      data-slot="dialog-overlay"
      className={cn(
        'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50',
        className,
      )}
      {...props}
    />
  )
}

function DialogContent({
  className,
  children,
  showCloseButton = true,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Content> & {
  showCloseButton?: boolean
}) {
  return (
    <DialogPortal data-slot="dialog-portal">
      <DialogOverlay />
      <DialogPrimitive.Content
        data-slot="dialog-content"
        className={cn(
          `
            bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0
            data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95
            fixed top-0 left-0 right-0 bottom-0 z-[99999] grid w-screen h-screen shadow-lg duration-200
          `,
          className,
        )}
        {...props}
      >
        {children}
        {showCloseButton && (
          <DialogPrimitive.Close
            data-slot="dialog-close"
            className={`
                cursor-pointer text-white absolute top-5 right-5 sm:right-24 
                transition-opacity hover:text-tertiary-hove
                [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-6 sm:[&_svg:not([class*='size-'])]:size-8
             `}
          >
            <XIcon />
            <span className="sr-only">Close</span>
          </DialogPrimitive.Close>
        )}
      </DialogPrimitive.Content>
    </DialogPortal>
  )
}

type Props = {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  content: React.ReactElement
  title: string
  className?: string
} & React.PropsWithChildren

export function Modal({ open, onOpenChange, title, content, className, children }: Props) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className={className}>
        <DialogPrimitive.Title className="absolute sm:left-[5rem] py-[1.5rem] pl-[1rem] w-screen sm:w-[calc(100%-10rem)]">
          <div className="w-[calc(100%-4rem)] sm:w-[calc(100%-8rem)] text-white text-base sm:text-xl leading-[120%] font-semibold">
            {title}
          </div>
        </DialogPrimitive.Title>
        <div className="absolute sm:left-[5rem] pt-[4rem] lg:border-1 sm:border-table-border w-screen sm:w-[calc(100%-10rem)] h-screen sm:h-[calc(100%-3.5rem)]">
          {content}
        </div>
      </DialogContent>
    </Dialog>
  )
}

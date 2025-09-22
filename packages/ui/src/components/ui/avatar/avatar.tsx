'use client'
import * as React from 'react'
import * as AvatarPrimitive from '@radix-ui/react-avatar'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const avatarVariants = cva('relative flex shrink-0 overflow-hidden rounded-full font-semibold', {
  variants: {
    size: {
      xs: 'size-[1.5rem] text-xs',
      sm: 'size-[2rem] text-sm',
      md: 'size-[2.5rem] text-base',
      lg: 'size-[3rem] text-lg',
      xl: 'size-[3.5rem] text-xl',
      '2xl': 'size-[4rem] text-2xl',
    },
  },
  defaultVariants: {
    size: 'sm',
  },
})

function AvatarContainer({
  className,
  size,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Root> & VariantProps<typeof avatarVariants>) {
  return (
    <AvatarPrimitive.Root
      data-slot="avatar"
      className={cn(avatarVariants({ size, className }))}
      {...props}
    />
  )
}

function AvatarImage({ className, ...props }: React.ComponentProps<typeof AvatarPrimitive.Image>) {
  return (
    <AvatarPrimitive.Image
      data-slot="avatar-image"
      className={cn('aspect-square size-full text-base', className)}
      {...props}
    />
  )
}

function AvatarFallback({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Fallback>) {
  return (
    <AvatarPrimitive.Fallback
      data-slot="avatar-fallback"
      className={cn(
        'bg-avatar text-quaternaryflex size-full items-center justify-center rounded-full',
        className,
      )}
      {...props}
    />
  )
}

type Props = {
  image?: {
    src: string
    alt: string
  }
  fallback?: string
  className?: string
}

export function Avatar({
  image,
  fallback,
  size,
  className,
}: Props & VariantProps<typeof avatarVariants>) {
  return (
    <AvatarContainer className={className} size={size}>
      <AvatarImage src={image?.src} alt={image?.alt} />
      <AvatarFallback>{fallback}</AvatarFallback>
    </AvatarContainer>
  )
}

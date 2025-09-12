'use client'

import * as React from 'react'
import * as TabsPrimitive from '@radix-ui/react-tabs'

import { cn } from '@/lib/utils'

function TabsRoot({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.Root>) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      className={cn('flex flex-col gap-2', className)}
      {...props}
    />
  )
}

function TabsList({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.List>) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      className={cn('flex flex-row gap-[1rem] mb-[1rem]', className)}
      {...props}
    />
  )
}

function TabsTrigger({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      className={cn(
        ` 
          group relative cursor-pointer
          text-white inline-flex items-center justify-center gap-[0.5rem] 
          text-sm font-medium whitespace-nowrap transition-colors
          disabled:pointer-events-none disabled:opacity-50
          focus-visible:outline-none
          hover:text-primary data-[state=active]:text-primary
          after:absolute after:-bottom-[0.75rem] after:left-0 after:h-[0.13rem] after:w-full after:scale-x-0 
          after:bg-primary after:transition-transform
          hover:after:scale-x-100 data-[state=active]:after:scale-x-100
        `,
        className,
      )}
      {...props}
    />
  )
}

function TabsContent({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return (
    <TabsPrimitive.Content
      data-slot="tabs-content"
      className={cn('flex-1 outline-none', className)}
      {...props}
    />
  )
}

type Option = {
  value: string
  label: string
  content: React.ReactNode
  pill?: string | number
  disabled?: boolean
}

type Props = {
  options: Option[]
  defaultValue?: string
  className?: string
}

export function Tabs({ options, defaultValue, className }: Props) {
  return (
    <TabsRoot defaultValue={defaultValue} className={className}>
      <TabsList>
        {options.map((option) => (
          <TabsTrigger disabled={option.disabled} key={option.value} value={option.value}>
            {option.label}
            {option.pill && (
              <span
                className={`flex flex-row items-center justify-center p-[0.5rem] w-[1.5rem] h-[1.5rem] 
                  bg-gray-50 border border-gray-200 rounded-full 
                  box-border text-white text-sm 
                  `}
              >
                {option.pill}
              </span>
            )}
          </TabsTrigger>
        ))}
      </TabsList>
      {options.map((option) => (
        <TabsContent key={option.value} value={option.value}>
          {option.content}
        </TabsContent>
      ))}
    </TabsRoot>
  )
}

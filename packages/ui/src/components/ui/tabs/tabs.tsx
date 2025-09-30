'use client'

import { type ComponentProps, useMemo, useState, useEffect } from 'react'
import * as TabsPrimitive from '@radix-ui/react-tabs'
import { cn } from '@/lib/utils'

function TabsRoot({ className, ...props }: ComponentProps<typeof TabsPrimitive.Root>) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      className={cn('w-full flex flex-col items-center', className)}
      {...props}
    />
  )
}

function TabsList({ className, ...props }: ComponentProps<typeof TabsPrimitive.List>) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      className={cn(
        'w-full flex flex-row gap-[1rem] px-[1rem] py-[0.75rem] border-1 border-[var(--table-border)]',
        className,
      )}
      {...props}
    />
  )
}

function TabsTrigger({ className, ...props }: ComponentProps<typeof TabsPrimitive.Trigger>) {
  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      className={cn(
        ` 
          group relative cursor-pointer uppercase
          text-neutral-500 inline-flex items-center justify-center
          text-xs font-bold leading-[140%]  whitespace-nowrap transition-colors
          disabled:pointer-events-none disabled:opacity-50
          focus-visible:outline-none
          hover:text-primary data-[state=active]:text-primary         
        `,
        className,
      )}
      {...props}
    />
  )
}

function TabsContent({ className, ...props }: ComponentProps<typeof TabsPrimitive.Content>) {
  return (
    <TabsPrimitive.Content
      data-slot="tabs-content"
      className={cn('w-full flex-1 outline-none', className)}
      {...props}
    />
  )
}

type Tab = {
  value: string
  label: string
  content: React.ReactNode
  pill?: string | number
  disabled?: boolean
  tabs?: Omit<Tab, 'tabs'>[]
}

type Props = {
  tabs: Tab[]
  defaultValue?: string
  className?: string
}

export function Tabs({ tabs, defaultValue, className }: Props) {
  const [tabValue, setTabValue] = useState<string>()
  const [subTabValue, setSubTabValue] = useState<string>()
  const [activeTabs, setActiveTabs] = useState<Tab[]>()

  const subTabs = useMemo(() => {
    return tabs.find(({ value }) => value === tabValue)
  }, [tabValue, tabs])

  function handleClickTab(tab: Tab) {
    setTabValue(tab.value)
    setSubTabValue(tab.tabs?.[0]?.value)

    if (tab.tabs?.length) {
      setActiveTabs(tab.tabs)
    } else {
      setActiveTabs(tabs)
    }
  }

  useEffect(() => {
    setActiveTabs(tabs)
  }, [tabs])

  useEffect(() => {
    const defaultTab = tabs.find(({ value }) => value === defaultValue)

    if (defaultTab?.tabs) {
      setTabValue(defaultValue)
      setActiveTabs(defaultTab.tabs)
      setSubTabValue(defaultTab.tabs?.[0]?.value)
    } else {
      setTabValue(defaultValue)
    }
  }, [defaultValue, tabs])

  return (
    <TabsRoot value={subTabValue || tabValue} defaultValue={defaultValue} className={className}>
      <TabsList>
        <div className="w-full flex flex-row justify-between">
          <div className="flex gap-[1.5rem]">
            {tabs?.map((tab, index) => (
              <TabsTrigger
                onClick={() => handleClickTab(tab)}
                disabled={tab.disabled}
                key={tab.value}
                value={tab.value}
                data-state={tabValue === tab.value ? 'active' : ''}
              >
                <div className="flex gap-[1.5rem]">
                  <div className="flex items-center gap-2">
                    {tab.label}
                    {tab.pill && (
                      <span
                        className={`flex flex-row items-center justify-center p-[0.5rem] w-[1rem] h-[1rem] 
                          bg-gray-50 border border-gray-200 rounded-full 
                            box-border text-white text-xs 
                        `}
                      >
                        {tab.pill}
                      </span>
                    )}
                  </div>

                  {tabs.length > index + 1 && (
                    <div className="w-[1px] h-[1rem] bg-[var(--card-hover)]" />
                  )}
                </div>
              </TabsTrigger>
            ))}
          </div>

          <div className="flex gap-[1rem]">
            {subTabs?.tabs?.map((tab) => (
              <TabsTrigger
                onClick={() => {
                  setActiveTabs(subTabs?.tabs)
                  setSubTabValue(tab.value)
                }}
                disabled={tab.disabled}
                key={tab.value}
                value={tab.value}
                className={`
                  hover:text-white
                  after:absolute after:-bottom-[0.75rem] after:left-0 after:h-[0.13rem] after:w-full after:scale-x-0 
                  after:bg-primary after:transition-transform
                  hover:after:scale-x-100 data-[state=active]:after:scale-x-100  
                  data-[state=active]:text-white
                `}
                data-state={subTabValue === tab.value ? 'active' : ''}
              >
                <div className="flex">
                  <div className="flex items-center gap-2">
                    {tab.label}
                    {tab.pill && (
                      <span
                        className={`flex flex-row items-center justify-center p-[0.5rem] w-[1rem] h-[1rem] 
                          bg-gray-50 border border-gray-200 rounded-full 
                            box-border text-white text-xs 
                        `}
                      >
                        {tab.pill}
                      </span>
                    )}
                  </div>
                </div>
              </TabsTrigger>
            ))}
          </div>
        </div>
      </TabsList>

      {activeTabs?.map((tab) => (
        <TabsContent key={tab.value} value={tab.value}>
          {tab.content}
        </TabsContent>
      ))}
    </TabsRoot>
  )
}

// Tabs.test.tsx
import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Tabs } from '.'

const tabs = [
  { value: 'tab1', label: 'Tab 1', content: <div>Content 1</div>, pill: 2 },
  { value: 'tab2', label: 'Tab 2', content: <div>Content 2</div> },
  { value: 'tab3', label: 'Tab 3', content: <div>Content 3</div>, disabled: true },
]

const nestedTabs = [
  {
    value: 'main',
    label: 'Main',
    content: <div>Main content</div>,
    tabs: [
      { value: 'sub1', label: 'Sub 1', content: <div>Sub 1 Content</div> },
      { value: 'sub2', label: 'Sub 2', content: <div>Sub 2 Content</div>, pill: 7 },
    ],
  },
  {
    value: 'other',
    label: 'Other',
    content: <div>Other content</div>,
    tabs: [
      { value: 'subOther1', label: 'Sub Other 1', content: <div>Sub Other Content 2</div> },
      {
        value: 'subOther2',
        label: 'Sub Other 2',
        content: <div>Sub Other Content 2</div>,
        pill: 7,
      },
    ],
  },
]

describe('Tabs', () => {
  it('should render tabs with labels and pills', () => {
    render(<Tabs tabs={tabs} defaultValue="tab1" />)
    expect(screen.getByText('Tab 1')).toBeInTheDocument()
    expect(screen.getByText('Tab 2')).toBeInTheDocument()
    expect(screen.getByText('Tab 3')).toBeInTheDocument()
    expect(screen.getByText('2')).toBeInTheDocument()
  })

  it('should render default tab content', () => {
    render(<Tabs tabs={tabs} defaultValue="tab1" />)
    expect(screen.getByText('Content 1')).toBeVisible()
  })

  it('should switch content when clicking another tab', async () => {
    render(<Tabs tabs={tabs} defaultValue="tab1" />)
    const tab2 = screen.getByText('Tab 2')
    await userEvent.click(tab2)
    expect(screen.getByText('Content 2')).toBeVisible()
  })

  it('should not activate disabled tab when clicked', async () => {
    render(<Tabs tabs={tabs} defaultValue="tab1" />)
    const tab3 = screen.getByText('Tab 3')
    await userEvent.click(tab3)
    expect(screen.queryByText('Content 3')).not.toBeInTheDocument()
  })

  it('should render nested tabs and switch subtabs', () => {
    render(<Tabs tabs={nestedTabs} defaultValue="main" />)

    expect(screen.getByText('Main')).toBeInTheDocument()
    expect(screen.getByText('Sub 1')).toBeInTheDocument()
    expect(screen.getByText('Sub 2')).toBeInTheDocument()
    expect(screen.getByText('Sub 1 Content')).toBeInTheDocument()

    fireEvent.click(screen.getByText('Sub 2'))
    expect(screen.getByText('Sub 2 Content')).toBeInTheDocument()

    fireEvent.click(screen.getByText('Other'))
    fireEvent.click(screen.getByText('Sub Other 2'))
    expect(screen.getByText('Sub Other Content 2')).toBeInTheDocument()
  })
})

// Tabs.test.tsx
import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Tabs } from '.'

const options = [
  { value: 'tab1', label: 'Tab 1', content: <div>Content 1</div>, pill: 2 },
  { value: 'tab2', label: 'Tab 2', content: <div>Content 2</div> },
  { value: 'tab3', label: 'Tab 3', content: <div>Content 3</div>, disabled: true },
]

describe('Tabs', () => {
  it('should render tabs with labels and pills', () => {
    render(<Tabs options={options} defaultValue="tab1" />)
    expect(screen.getByText('Tab 1')).toBeInTheDocument()
    expect(screen.getByText('Tab 2')).toBeInTheDocument()
    expect(screen.getByText('Tab 3')).toBeInTheDocument()
    expect(screen.getByText('2')).toBeInTheDocument()
  })

  it('should render default tab content', () => {
    render(<Tabs options={options} defaultValue="tab1" />)
    expect(screen.getByText('Content 1')).toBeVisible()
  })

  it('should switch content when clicking another tab', async () => {
    render(<Tabs options={options} defaultValue="tab1" />)
    const tab2 = screen.getByText('Tab 2')
    await userEvent.click(tab2)
    expect(screen.getByText('Content 2')).toBeVisible()
  })

  it('should not activate disabled tab when clicked', async () => {
    render(<Tabs options={options} defaultValue="tab1" />)
    const tab3 = screen.getByText('Tab 3')
    await userEvent.click(tab3)
    expect(screen.queryByText('Content 3')).not.toBeInTheDocument()
  })

  it('should navigate tabs using keyboard arrows', async () => {
    render(<Tabs options={options} defaultValue="tab1" />)
    const tab1 = screen.getByText('Tab 1')
    tab1.focus()
    await userEvent.keyboard('{ArrowRight}')
    expect(screen.getByText('Content 2')).toBeVisible()
    await userEvent.keyboard('{ArrowLeft}')
    expect(screen.getByText('Content 1')).toBeVisible()
  })

  it('should apply proper classes on active and hover states', async () => {
    render(<Tabs options={options} defaultValue="tab1" />)
    const tab1 = screen.getByText('Tab 1')
    expect(tab1.className).toContain('data-[state=active]:text-primary')
    fireEvent.mouseOver(tab1)
    expect(tab1.className).toContain('hover:text-primary')
  })
})

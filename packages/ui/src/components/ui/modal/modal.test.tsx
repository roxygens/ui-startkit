import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import { Modal } from '.'

describe('Modal', () => {
  const title = 'Test Modal'
  const content = <div data-testid="modal-content">Modal Content</div>

  it('should render trigger and not show content initially when closed', () => {
    render(
      <Modal title={title} content={content}>
        <button data-testid="trigger">Open</button>
      </Modal>,
    )
    expect(screen.getByTestId('trigger')).toBeInTheDocument()
    expect(screen.queryByTestId('modal-content')).not.toBeInTheDocument()
  })

  it('should open modal when trigger is clicked', async () => {
    const user = userEvent.setup()
    render(
      <Modal title={title} content={content}>
        <button data-testid="trigger">Open</button>
      </Modal>,
    )
    await user.click(screen.getByTestId('trigger'))
    expect(await screen.findByTestId('modal-content')).toBeInTheDocument()
    expect(screen.getByText(title)).toHaveClass('text-base lg:text-xl')
  })

  it('should call onOpenChange when modal is opened and closed', async () => {
    const user = userEvent.setup()
    const onOpenChange = vi.fn()
    render(
      <Modal title={title} content={content} onOpenChange={onOpenChange}>
        <button data-testid="trigger">Open</button>
      </Modal>,
    )
    await user.click(screen.getByTestId('trigger'))
    expect(onOpenChange).toHaveBeenCalledWith(true)
    const closeButton = await screen.findByRole('button', { name: /close/i })
    await user.click(closeButton)
    expect(onOpenChange).toHaveBeenCalledWith(false)
  })

  it('should hide close button when showCloseButton is false', async () => {
    const user = userEvent.setup()
    render(
      <Modal title={title} content={content}>
        <button data-testid="trigger">Open</button>
      </Modal>,
    )
    await user.click(screen.getByTestId('trigger'))
    const closeButton = await screen.findByRole('button', { name: /close/i })
    expect(closeButton).toBeInTheDocument()
  })
})

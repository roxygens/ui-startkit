import type { Meta, StoryObj } from '@storybook/react-vite'
import { Modal } from '.'
import { Button } from '../button'

const meta: Meta<typeof Modal> = {
  title: 'Components/Modal',
  component: Modal,
  tags: ['autodocs'],
  argTypes: {},
}

export default meta

type Story = StoryObj<typeof Modal>

export const Default: Story = {
  render({ className }) {
    return (
      <Modal
        title="Modal Title"
        content={
          <div className="flex w-full">
            <h1 className="mx-auto pt-9 text-white">Modal content</h1>
          </div>
        }
        className={className}
      >
        <Button>Abrir Modal</Button>
      </Modal>
    )
  },
}

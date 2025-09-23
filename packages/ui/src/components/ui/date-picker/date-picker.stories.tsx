import type { Meta, StoryObj } from '@storybook/react-vite'
import { DatePicker } from '.'

const meta: Meta<typeof DatePicker> = {
  title: 'Components/Date Picker',
  component: DatePicker,
  tags: ['autodocs'],
  argTypes: {
    mode: {
      options: ['single', 'multiple', 'range'],
      control: { type: 'select' },
    },
    captionLayout: {
      options: ['label', 'dropdown', 'dropdown-months', 'dropdown-years'],
      control: { type: 'select' },
    },
  },
}

export default meta

type Story = StoryObj<typeof DatePicker>

export const Default: Story = {
  args: {
    mode: 'range',
    numberOfMonths: 2,
    selected: undefined,
    onSelect: () => {},
    showOutsideDays: true,
    captionLayout: 'label',
  },
  render: ({ mode, numberOfMonths, showOutsideDays, captionLayout }) => {
    return (
      <DatePicker
        mode={mode as 'single'}
        numberOfMonths={numberOfMonths}
        showOutsideDays={showOutsideDays}
        captionLayout={captionLayout}
      />
    )
  },
}

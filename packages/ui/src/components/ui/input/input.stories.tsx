import type { Meta, StoryObj } from '@storybook/react-vite';
import { Input } from '.';

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  tags: ['autodocs'],
  argTypes: {
    
    size: {
      options: ['xs', 'sm', 'md', 'lg'],
      control: { type: 'select' },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {
    placeholder: 'Placeholder',
    size: 'md' 
  },
};


export const ExtraSmall: Story = {
  args: {
    placeholder: 'Placeholder',
    size: 'xs'
  },
};


export const Small: Story = {
  args: {
    placeholder: 'Placeholder',
    size: 'sm'
  },
};

export const Large: Story = {
  args: {
    placeholder: 'Placeholder',
    size: 'lg'
  },
};

export const Password: Story = {
  args: {
    placeholder: 'Placeholder',
    type: 'password'
  },
};


export const Error: Story = {
  args: {
    placeholder: 'Placeholder',
    'aria-invalid': true
  },
};




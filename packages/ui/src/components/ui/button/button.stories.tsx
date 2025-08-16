import type { Meta, StoryObj } from '@storybook/react-vite';
import {Circle  } from 'lucide-react'
import { Button } from '.';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      options: ['primary', 'secondary', 'tertiary', 'link'],
      control: { type: 'select' },
    },
    size: {
      options: ['sm', 'md', 'lg', 'xl'],
      control: { type: 'select' },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    children: 'Button',
    variant: 'primary',
    size: 'sm',
    icon: <Circle />,
    iconPosition: 'both'
  },
};

export const PrimaryIcon: Story = {
  args: {
    children: 'Button',
    variant: 'primary',
    size: 'sm',
    icon: <Circle />,
    isIconButton: true
  },
};



export const Secondary: Story = {
  args: {
    children: 'Button',
    variant: 'secondary',
    size: 'sm',
    icon: <Circle />,
    iconPosition: 'both'
  },
};

export const SecondaryIcon: Story = {
  args: {
    children: 'Button',
    variant: 'secondary',
    size: 'sm',
    icon: <Circle />,
    isIconButton: true
  },
};

export const Tertiary: Story = {
  args: {
    children: 'Button',
    variant: 'tertiary',
    size: 'sm',
    icon: <Circle />,
    iconPosition: 'both'
  },
};

export const TertiaryIcon: Story = {
  args: {
    children: 'Button',
    variant: 'tertiary',
    size: 'sm',
    icon: <Circle />,
     isIconButton: true
  },
};


export const Link: Story = {
  args: {
    children: 'Button',
    variant: 'link',
    size: 'sm',
    icon: <Circle />,
    iconPosition: 'both'
  },
};


import type { Preview } from '@storybook/react-vite'
import { themes } from '@storybook/theming'
import '../src/index.css'

const preview: Preview = {
  tags: ['!dev'],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: 'dark',
      values: [
        { name: 'light', value: '#ffffff' },
        { name: 'dark', value: 'var(--background)' },
        { name: 'brand', value: 'var(--background)' },
      ],
    },
    docs: {
      theme: themes.dark,
    },
  },
  decorators: [
    (Story, context) => {
      if (context.viewMode === 'docs') {
        return (
          <div className="flex items-center justify-center py-[60px]">
            <Story />
          </div>
        )
      }

      return (
        <div className="flex items-center justify-center h-screen bg-[var(--background)]">
          <Story />
        </div>
      )
    },
  ],
}

export default preview

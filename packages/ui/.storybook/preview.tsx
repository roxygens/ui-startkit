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
    },
    docs: {
      theme: themes.dark,
    },
  },
  decorators: [
    (Story, context) => {
      if (context.viewMode === 'docs') {
        return (
          <div className="flex items-center justify-center mx-[-1.88rem] my-[-2.5rem] px-[1.75rem] py-[100px] bg-background">
            <Story />
          </div>
        )
      }

      return (
        <div className="flex items-center justify-center h-screen bg-background">
          <Story />
        </div>
      )
    },
  ],
}

export default preview

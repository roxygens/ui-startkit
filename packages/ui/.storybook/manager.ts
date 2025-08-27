// .storybook/manager.ts
import { addons } from '@storybook/manager-api'
import { create } from '@storybook/theming'
import type { ThemeVars } from '@storybook/theming'

const myTheme: ThemeVars = create({
  base: 'dark',
  brandTitle: 'UI Start Kit - Components Docs',
  brandImage: '/images/logo.png',
  brandTarget: '_self',
})

addons.setConfig({
  theme: myTheme,
})

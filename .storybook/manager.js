import { addons } from '@storybook/addons'
import theme from './theme'

addons.setConfig({
  theme,
  showPanel: false,
  enableShortcuts: false,
  selectedPanel: 'knobs',
})

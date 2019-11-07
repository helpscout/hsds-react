import React from 'react'
import {
  addDecorator,
  configure,
  addParameters,
  setAddon,
} from '@storybook/react'
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport'
import { create } from '@storybook/theming'
import { withKnobs } from '@storybook/addon-knobs'
import { StatsGraph } from '@helpscout/stats'
import { addReadme } from 'storybook-readme'
import { withA11y } from '@storybook/addon-a11y'

import '../src/adapters/app'
import '../src/styles/blue.scss'
import './storybook.css'

const withStats = storyFn => (
  <div>
    <StatsGraph right={5} opacity={0.2} />
    {storyFn()}
  </div>
)

addDecorator(withStats)
addDecorator(withKnobs)
addDecorator(addReadme)
addDecorator(withA11y)

addParameters({
  options: {
    theme: create({
      base: 'light',
      brandTitle: 'HSDS: React',
      brandUrl:
        'https://github.com/helpscout/hsds-react/tree/master/src/components',
    }),
    isFullscreen: false,
    panelPosition: 'right',
    isToolshown: true,
  },
  readme: {
    codeTheme: 'a11y-dark',
  },
  viewport: {
    viewports: {
      ...INITIAL_VIEWPORTS,
    },
  },
})

// automatically import all files ending in *.stories.js
function loadStories() {
  const req = require.context('../stories', true, /.stories.(js|ts|tsx)$/)
  req.keys().forEach(filename => req(filename))
}

configure(loadStories, module)

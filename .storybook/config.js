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
import { withConsole } from '@storybook/addon-console'
import { withA11y } from '@storybook/addon-a11y'

import '../src/adapters/app'
import './storybook.css'
import '@storybook/addon-console'

import GlobalStyle from '../src/components/GlobalStyle'

const withStats = storyFn => (
  <div>
    <StatsGraph right={5} opacity={0.2} />
    {storyFn()}
  </div>
)

const withGlobalStyle = storyFn => (
  <>
    <GlobalStyle />
    {storyFn()}
  </>
)

addDecorator(withStats)
addDecorator(withKnobs)
addDecorator(addReadme)
addDecorator((storyFn, context) => withConsole()(storyFn)(context))
addDecorator(withA11y)
addDecorator(withGlobalStyle)

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

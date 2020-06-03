import React from 'react'
import {
  addDecorator,
  configure,
  addParameters,
  setAddon,
} from '@storybook/react'
import { create } from '@storybook/theming'
import { withKnobs } from '@storybook/addon-knobs'
import { withA11y } from '@storybook/addon-a11y'

import '../src/adapters/app'
import '../src/styles/blue.scss'
import './storybook.css'

addDecorator(withKnobs)
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
})

// automatically import all files ending in *.stories.js
function loadStories() {
  const reqs = [
    require.context('../stories', true, /.stories.(js|ts|tsx)$/),
    require.context('../src', true, /.stories.(js|ts|tsx)$/),
  ]

  reqs.forEach(req => req.keys().forEach(filename => req(filename)))
}

configure(loadStories, module)

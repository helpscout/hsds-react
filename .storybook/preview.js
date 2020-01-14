import React from 'react'
import { addDecorator, addParameters } from '@storybook/react'
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport'
import { create } from '@storybook/theming'
import { withKnobs } from '@storybook/addon-knobs'
import { withA11y } from '@storybook/addon-a11y'

import '../src/adapters/app'
import './storybook.css'

import HSDS from '../src/components/HSDS'

const withHSDSScope = storyFn => <HSDS.Provider>{storyFn()}</HSDS.Provider>

addDecorator(withKnobs)
addDecorator(withA11y)
addDecorator(withHSDSScope)

addParameters({
  options: {
    theme: create({
      base: 'light',
      brandTitle: 'HSDS: React',
      brandUrl:
        'https://github.com/helpscout/hsds-react/tree/master/src/components',
    }),
    isFullscreen: false,
    panelPosition: 'bottom',
    isToolshown: true,
  },
  viewport: {
    viewports: {
      ...INITIAL_VIEWPORTS,
    },
  },
})

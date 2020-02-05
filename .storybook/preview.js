import React from 'react'
import { addDecorator, addParameters } from '@storybook/react'
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
    showRoots: true,
  },
})

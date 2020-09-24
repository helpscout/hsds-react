import React from 'react'
import { addDecorator, addParameters } from '@storybook/react'
import { withDesign } from 'storybook-addon-designs'

import '../src/adapters/app'
import './storybook.css'
import './font-hs-app.css'

import HSDS from '../src/components/HSDS'

const withHSDSScope = storyFn => <HSDS.Provider>{storyFn()}</HSDS.Provider>

addDecorator(withDesign)
addDecorator(withHSDSScope)

addParameters({
  options: {
    showRoots: true,
    storySort: (a, b) =>
      a[1].kind === b[1].kind
        ? 0
        : a[1].id.localeCompare(b[1].id, undefined, { numeric: true }),
  },
})

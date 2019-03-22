import * as React from 'react'
import { HsApp } from '../../src/components'
import { WithAktiv } from './withAktiv'

const withHsApp = storyFn => (
  <WithAktiv>
    <HsApp>{storyFn()}</HsApp>
  </WithAktiv>
)

export default withHsApp

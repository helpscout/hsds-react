import React from 'react'
import { storiesOf } from '@storybook/react'
import { Spinner } from '../src/index.js'

const stories = storiesOf('Spinner', module)

stories.add('default', () => (
  <div>
    <Spinner />
  </div>
))

stories.add('sizes', () => (
  <div>
    <div>
      xl
      <Spinner size="xl" />
    </div>
    <div>
      lg
      <Spinner size="lg" />
    </div>
    <div>
      md
      <Spinner size="md" />
    </div>
    <div>
      sm
      <Spinner size="sm" />
    </div>
    <div>
      xs
      <Spinner size="xs" />
    </div>
  </div>
))

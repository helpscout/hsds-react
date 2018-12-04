import React from 'react'
import { storiesOf } from '@storybook/react'
import { ProgressBar } from '../src/index.js'

storiesOf('ProgressBar', module)
  .add('default', () => <ProgressBar value={50} />)
  .add('sizes', () => (
    <div>
      <ProgressBar value={50} size="lg" />
      <br />
      <ProgressBar value={50} size="md" />
      <br />
      <ProgressBar value={50} size="sm" />
      <br />
    </div>
  ))

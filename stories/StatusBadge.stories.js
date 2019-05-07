import React from 'react'
import { storiesOf } from '@storybook/react'
import { StatusBadge } from '../src/index'

const stories = storiesOf('StatusBadge', module)

stories.add('default', () => (
  <div>
    <p>
      Regular:
      <StatusBadge count={19} />
    </p>
    <p>
      Big Number:
      <StatusBadge count={203021} />
    </p>
    <p>
      Big Number with commas:
      <StatusBadge count="2,043,021,134" />
    </p>
  </div>
))

stories.add('status', () => (
  <div>
    <p>
      New:
      <StatusBadge count={19} status="new" />
    </p>
    <p>
      Error (Offline):
      <StatusBadge count={203021} status="offline" />
    </p>
  </div>
))

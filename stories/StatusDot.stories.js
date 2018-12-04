import React from 'react'
import { storiesOf } from '@storybook/react'
import { StatusDot } from '../src/index.js'

const stories = storiesOf('StatusDot', module)

stories.add('default', () => <StatusDot />)

stories.add('borderColor', () => (
  <div>
    <div>
      <StatusDot status="online" inline borderColor="red" />: Online
    </div>
  </div>
))

stories.add('outerBorderColor', () => (
  <div>
    <div>
      <StatusDot status="online" inline outerBorderColor="red" />: Online
    </div>
  </div>
))

stories.add('icon', () => (
  <div style={{ background: '#eee' }}>
    <div>
      <StatusDot status="online" inline icon="tick" />: Online
    </div>
    <div>
      <StatusDot status="offline" inline icon="cross" />: Offline
    </div>
  </div>
))

stories.add('states', () => (
  <div>
    <div>
      <StatusDot status="online" inline />: Online
    </div>
    <div>
      <StatusDot status="offline" inline />: Offline
    </div>
    <div>
      <StatusDot status="busy" inline />: Busy
    </div>
    <div>
      <StatusDot status="active" inline />: Active
    </div>
    <div>
      <StatusDot status="inactive" inline />: Inactive
    </div>
  </div>
))

stories.add('sizes', () => (
  <div>
    <div>
      <StatusDot inline size="md" />: MD
    </div>
    <div>
      <StatusDot inline size="sm" />: SM
    </div>
  </div>
))

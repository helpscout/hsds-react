import React from 'react'
import { storiesOf } from '@storybook/react'
import { Timestamp } from '../src/index.js'

const stories = storiesOf('Timestamp', module)

const customFormatter = timestamp => {
  const now = new Date().toISOString()

  return `${timestamp} (updated at ${now})`
}

stories.add('default', () => <Timestamp timestamp="10:41am" />)

stories.add('live', () => (
  <Timestamp timestamp={new Date().toISOString()} live />
))

stories.add('formatter', () => (
  <Timestamp
    timestamp={new Date().toISOString()}
    live
    formatter={customFormatter}
  />
))

stories.add('Time', () => (
  <Timestamp.Time
    timestamp={new Date().toISOString()}
    live
    formatter={customFormatter}
  />
))

import React from 'react'
import { storiesOf } from '@storybook/react'
import { Timestamp } from '../src/index.js'

const stories = storiesOf('Timestamp', module)

let count = 0
const customFormatter = timestamp => {
  const now = (new Date()).toISOString()

  return `${timestamp} (update ${count++} at ${now})`
}

stories.add('default', () => (
  <Timestamp timestamp='10:41am' />
))

stories.add('live', () => (
  <Timestamp timestamp={(new Date()).toISOString()} live />
))

stories.add('formatter', () => (
  <Timestamp timestamp={(new Date()).toISOString()} live formatter={customFormatter} />
))

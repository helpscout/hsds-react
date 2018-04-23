import React from 'react'
import { storiesOf } from '@storybook/react'
import { Timestamp } from '../src/index.js'

const stories = storiesOf('Timestamp', module)

const customFormatter = timestamp => `Yes!: ${timestamp}`

stories.add('default', () => (
  <Timestamp timestamp='10:41am' />
))

stories.add('live', () => (
  <Timestamp timestamp='10:41am' live />
))

stories.add('formatter', () => (
  <Timestamp timestamp='10:41am' live formatter={customFormatter} />
))

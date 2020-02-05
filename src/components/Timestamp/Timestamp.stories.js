import React from 'react'
import { Timestamp } from '../index'

export default {
  component: Timestamp,
  title: 'Components/Text/Timestamp',
}

const customFormatter = timestamp => {
  const now = new Date().toISOString()

  return `${timestamp} (updated at ${now})`
}

export const Default = () => <Timestamp timestamp="10:41am" />

Default.story = {
  name: 'default',
}

export const Live = () => (
  <Timestamp timestamp={new Date().toISOString()} live />
)

Live.story = {
  name: 'live',
}

export const Formatter = () => (
  <Timestamp
    timestamp={new Date().toISOString()}
    live
    formatter={customFormatter}
  />
)

Formatter.story = {
  name: 'formatter',
}

export const _Time = () => (
  <Timestamp.Time
    timestamp={new Date().toISOString()}
    live
    formatter={customFormatter}
  />
)

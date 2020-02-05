import React from 'react'
import { LoadingDots, Text } from '../index'

export default {
  component: LoadingDots,
  title: 'Components/LoadingDots',
}

export const Default = () => <LoadingDots />

Default.story = {
  name: 'default',
}

export const Align = () => (
  <div>
    <Text>Left:</Text>
    <LoadingDots align="left" />
    <br />
    <Text>Center:</Text>
    <LoadingDots align="center" />
    <br />
    <Text>Left:</Text>
    <LoadingDots align="right" />
  </div>
)

Align.story = {
  name: 'align',
}

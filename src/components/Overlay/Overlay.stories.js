import React from 'react'
import { Card, Overlay } from '../index'

export default {
  component: Overlay,
  title: 'Utilities/Overlay',
}

export const Default = () => (
  <Overlay style={{ width: '500px', height: '400px' }}>
    <Card>Not now, Arctic Puffin!</Card>
  </Overlay>
)

Default.story = {
  name: 'default',
}

export const HsApp = () => (
  <Overlay style={{ width: '500px', height: '400px' }} isHsApp={true}>
    <Card>Not now, Arctic Puffin!</Card>
  </Overlay>
)

HsApp.story = {
  name: 'HS-App',
}

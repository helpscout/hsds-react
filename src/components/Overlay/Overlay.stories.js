import React from 'react'
import { Card, Overlay, PropProvider } from '../index'

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
  <PropProvider app="hs-app">
    <Overlay style={{ width: '500px', height: '400px' }}>
      <Card>Not now, Arctic Puffin!</Card>
    </Overlay>
  </PropProvider>
)

HsApp.story = {
  name: 'HS-App',
}

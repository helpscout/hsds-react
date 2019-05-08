import React from 'react'
import { storiesOf } from '@storybook/react'
import { Card, Overlay, PropProvider } from '../src/index'

const stories = storiesOf('Overlay', module)

stories.add('default', () => (
  <Overlay style={{ width: '500px', height: '400px' }}>
    <Card>Not now, Arctic Puffin!</Card>
  </Overlay>
))

stories.add('HS-App', () => (
  <PropProvider app="hs-app">
    <Overlay style={{ width: '500px', height: '400px' }}>
      <Card>Not now, Arctic Puffin!</Card>
    </Overlay>
  </PropProvider>
))

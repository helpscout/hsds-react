import React from 'react'
import { storiesOf } from '@storybook/react'
import { Card, Overlay } from '../src/index.js'

storiesOf('Overlay', module).add('default', () => (
  <Overlay style={{ width: '500px', height: '400px' }}>
    <Card>Not now, Arctic Puffin!</Card>
  </Overlay>
))

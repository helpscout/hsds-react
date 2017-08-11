import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { Card, Overlay } from '../src/index.js'

storiesOf('Overlay', module)
  .add('default', () => (
    <Overlay style={{width: '500px', height: '400px'}} onClick={action('Overlay clicked')}>
      <Card>Not now, Arctic Puffin!</Card>
    </Overlay>
  ))

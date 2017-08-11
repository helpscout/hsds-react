import React from 'react'
import { storiesOf } from '@storybook/react'
import { VisuallyHidden } from '../src/index.js'

storiesOf('VisuallyHidden', module)
  .add('default', () => <VisuallyHidden>Peek-a-boo! You can't see me</VisuallyHidden>)
  .add('focusable', () => <VisuallyHidden focusable><a href='#'>Focusable!</a></VisuallyHidden>)

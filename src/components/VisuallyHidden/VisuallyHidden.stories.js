import React from 'react'
import { VisuallyHidden } from '../index'

export default {
  component: VisuallyHidden,
  title: 'Utilities/VisuallyHidden',
}

export const Default = () => (
  <VisuallyHidden>Peek-a-boo! You can't see me</VisuallyHidden>
)

Default.story = {
  name: 'default',
}

export const Focusable = () => (
  <VisuallyHidden focusable>
    <a href="#">Focusable!</a>
  </VisuallyHidden>
)

Focusable.story = {
  name: 'focusable',
}

import React from 'react'
import { withKnobs, select } from '@storybook/addon-knobs'
import Inline from '.'

export default {
  component: Inline,
  title: 'Utilities/Inline',
}

export const Default = () => {
  const props = {
    size: select(
      'size',
      {
        lg: 'lg',
        md: 'md',
        sm: 'sm',
        xs: 'xs',
      },
      'sm'
    ),
  }

  return (
    <Inline {...props}>
      <Inline.Item>Derek</Inline.Item>
      <Inline.Item>Hansel</Inline.Item>
      <Inline.Item>Mugatu</Inline.Item>
    </Inline>
  )
}

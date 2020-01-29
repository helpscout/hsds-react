import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs, select } from '@storybook/addon-knobs'
import { withArtboard } from '@helpscout/artboard'
import Inline from '.'

const stories = storiesOf('Inline', module)

stories.addDecorator(
  withArtboard({
    withCenterGuides: false,
    showInterface: false,
    height: 100,
  })
)
stories.addDecorator(withKnobs)

stories.add('Default', () => {
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
})

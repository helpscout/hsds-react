import React from 'react'
import { storiesOf } from '@storybook/react'
import RateAction from '../src/components/RateAction'
import {
  withKnobs,
  boolean,
  number,
  text,
  select,
} from '@storybook/addon-knobs'
import { withArtboard } from '@helpscout/artboard'

const stories = storiesOf('RateAction', module)

stories.addDecorator(
  withArtboard({
    width: 100,
    height: 100,
    withCenterGuides: false,
  })
)
stories.addDecorator(withKnobs)

stories.add('Default', () => {
  const props = {
    size: select(
      'size',
      {
        md: 'md',
        sm: 'sm',
      },
      'md'
    ),
    isActive: boolean('isActive', false),
    disabled: boolean('disabled', false),
    withAnimation: boolean('withAnimation', true),
  }
  return (
    <div>
      <RateAction {...props} name="happy" />
      <RateAction {...props} name="sad" />
    </div>
  )
})

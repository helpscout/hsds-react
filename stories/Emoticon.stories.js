import React from 'react'
import { storiesOf } from '@storybook/react'
import { Emoticon } from '../src/index'
import {
  withKnobs,
  boolean,
  number,
  text,
  select,
} from '@storybook/addon-knobs'
import { withArtboard } from '@helpscout/artboard'

const stories = storiesOf('Emoticon', module)
stories.addDecorator(
  withArtboard({
    id: 'hsds-emoticon',
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
    inline: true,
    isActive: boolean('isActive', true),
    isDisabled: boolean('isDisabled', false),
    withAnimation: boolean('withAnimation', true),
  }
  return (
    <div>
      <Emoticon {...props} name="happy" />
      <Emoticon {...props} name="meh" />
      <Emoticon {...props} name="sad" />
    </div>
  )
})

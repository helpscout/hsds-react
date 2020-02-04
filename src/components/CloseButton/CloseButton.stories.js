import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs, boolean, select } from '@storybook/addon-knobs'
import { action } from '@storybook/addon-actions'
import { withArtboard } from '@helpscout/artboard'
import { CloseButton } from '../index'

const stories = storiesOf('Deleted/CloseButton', module)
stories.addDecorator(withKnobs)
stories.addDecorator(withArtboard({ withCenterGuides: false }))

stories.add('Default', () => {
  const options = {
    onClick: action('click'),
    seamless: boolean('seamless', true),
    size: select(
      'size',
      {
        lg: 'md',
        md: 'sm',
        sm: 'xs',
      },
      'md'
    ),
  }
  return <CloseButton {...options} />
})

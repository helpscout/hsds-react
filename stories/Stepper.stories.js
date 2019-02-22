import React from 'react'
import { storiesOf } from '@storybook/react'
import Stepper from '../src/components/Stepper'
import {
  withKnobs,
  boolean,
  number,
  text,
  select,
} from '@storybook/addon-knobs'
import { action } from '@storybook/addon-actions'
import { withArtboard } from '@helpscout/artboard'

const stories = storiesOf('Stepper', module)

stories.addDecorator(
  withArtboard({
    width: 500,
    height: 300,
    withCenterGuides: false,
    showInterface: false,
  })
)
stories.addDecorator(withKnobs)

stories.add('Default', () => {
  const props = {
    currentIndex: number('currentIndex', 0),
    isClickable: boolean('isClickable', false),
    onChange: action('onChange'),
    onStepClick: action('onStepClick'),
    onComplete: action('onComplete'),
    steps: [
      {
        title: 'Content',
      },
      {
        title: 'Trigger',
      },
      {
        title: 'Review',
      },
    ],
  }

  return <Stepper {...props} />
})

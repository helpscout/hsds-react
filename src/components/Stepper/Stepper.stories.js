import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs, boolean, number } from '@storybook/addon-knobs'
import { action } from '@storybook/addon-actions'
import { withArtboard } from '@helpscout/artboard'
import Stepper from '.'

const stories = storiesOf('Components/Stepper', module)

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

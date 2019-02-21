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

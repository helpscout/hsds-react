import React from 'react'
import { storiesOf } from '@storybook/react'
import DotStepper from './'
import { withKnobs, number } from '@storybook/addon-knobs'
import { withArtboard } from '@helpscout/artboard'

const stories = storiesOf('Components/DotStepper', module)

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
    numSteps: number('numSteps', 4),
    step: number('step', 2),
  }

  return <DotStepper {...props} />
})

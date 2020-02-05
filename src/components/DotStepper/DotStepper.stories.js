import React from 'react'
import DotStepper from './'
import { number } from '@storybook/addon-knobs'

export default {
  component: DotStepper,
  title: 'Components/Wayfinding/DotStepper',
}

export const Default = () => {
  const props = {
    numSteps: number('numSteps', 4),
    step: number('step', 2),
  }

  return <DotStepper {...props} />
}

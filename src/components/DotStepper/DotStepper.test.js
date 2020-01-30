import React from 'react'
import { mount } from 'enzyme'
import { DotStepperUI, BulletUI, ProgressBulletUI } from './DotStepper.css'
import DotStepper from './'
import Tooltip from '../Tooltip'

describe('className', () => {
  test('Has default className', () => {
    const wrapper = mount(<DotStepper />)
    expect(wrapper.find(DotStepperUI).hasClass('c-DotStepper')).toBeTruthy()
  })

  test('Can render custom className', () => {
    const customClassName = 'clazz'
    const wrapper = mount(<DotStepper className={customClassName} />)
    expect(wrapper.find(DotStepperUI).hasClass(customClassName)).toBeTruthy()
  })
})

describe('Steps', () => {
  test('Renders a BulletUI component for each step', () => {
    const numSteps = 8
    const wrapper = mount(<DotStepper numSteps={numSteps} />)
    expect(wrapper.find(BulletUI)).toHaveLength(numSteps)
  })

  test('Renders a single ProgressBulletUI component', () => {
    const numSteps = 8
    const wrapper = mount(<DotStepper numSteps={numSteps} />)
    expect(wrapper.find(ProgressBulletUI)).toHaveLength(1)
  })
})

describe('Tooltip', () => {
  test('Should render a Tooltip component', () => {
    const numSteps = 8
    const step = 4
    const wrapper = mount(<DotStepper numSteps={numSteps} step={step} />)
    expect(wrapper.find(Tooltip).prop('title')).toEqual(
      `Step ${step} of ${numSteps}`
    )
  })
})

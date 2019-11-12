import React from 'react'
import { mount, shallow, render } from 'enzyme'
import { DotStepperUI, BulletUI, ProgressBulletUI } from './DotStepper.css.js'
import DotStepper from './'

describe('className', () => {
  test('Has default className', () => {
    const wrapper = render(<DotStepper />)
    expect(wrapper.hasClass('c-DotStepper')).toBeTruthy()
  })

  test('Can render custom className', () => {
    const customClassName = 'clazz'
    const wrapper = render(<DotStepper className={customClassName} />)
    expect(wrapper.hasClass(customClassName)).toBeTruthy()
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

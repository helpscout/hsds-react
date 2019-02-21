import * as React from 'react'
import { mount, render } from 'enzyme'
import { Stepper } from '../Stepper'

describe('className', () => {
  test('Has default className', () => {
    const wrapper = render(<Stepper />)

    expect(wrapper.hasClass('c-Stepper')).toBeTruthy()
  })

  test('Can render custom className', () => {
    const customClassName = 'blue'
    const wrapper = render(<Stepper className={customClassName} />)

    expect(wrapper.hasClass(customClassName)).toBeTruthy()
  })
})

describe('HTML props', () => {
  test('Can render default HTML props', () => {
    const wrapper = render(<Stepper data-cy="blue" />)

    expect(wrapper.attr('data-cy')).toBe('blue')
  })
})

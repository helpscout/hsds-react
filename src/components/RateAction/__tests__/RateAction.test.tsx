import * as React from 'react'
import { mount, render } from 'enzyme'
import { RateAction } from '../RateAction'

describe('className', () => {
  test('Has default className', () => {
    const wrapper = render(<RateAction />)

    expect(wrapper.hasClass('c-RateAction')).toBeTruthy()
  })

  test('Can render custom className', () => {
    const customClassName = 'blue'
    const wrapper = render(<RateAction className={customClassName} />)

    expect(wrapper.hasClass(customClassName)).toBeTruthy()
  })
})

describe('HTML props', () => {
  test('Can render default HTML props', () => {
    const wrapper = render(<RateAction data-cy="blue" />)

    expect(wrapper.attr('data-cy')).toBe('blue')
  })
})

import * as React from 'react'
import { mount, render } from 'enzyme'
import { RatingFace } from '../RatingFace'

describe('className', () => {
  test('Has default className', () => {
    const wrapper = render(<RatingFace />)

    expect(wrapper.hasClass('c-RatingFace')).toBeTruthy()
  })

  test('Can render custom className', () => {
    const customClassName = 'blue'
    const wrapper = render(<RatingFace className={customClassName} />)

    expect(wrapper.hasClass(customClassName)).toBeTruthy()
  })
})

describe('HTML props', () => {
  test('Can render default HTML props', () => {
    const wrapper = render(<RatingFace data-cy="blue" />)

    expect(wrapper.attr('data-cy')).toBe('blue')
  })
})

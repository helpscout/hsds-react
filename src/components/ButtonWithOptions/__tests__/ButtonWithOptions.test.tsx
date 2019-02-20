import * as React from 'react'
import { mount, render } from 'enzyme'
import { ButtonWithOptions } from '../ButtonWithOptions'

describe('className', () => {
  test('Has default className', () => {
    const wrapper = render(<ButtonWithOptions />)

    expect(wrapper.hasClass('c-ButtonWithOptions')).toBeTruthy()
  })

  test('Can render custom className', () => {
    const customClassName = 'blue'
    const wrapper = render(<ButtonWithOptions className={customClassName} />)

    expect(wrapper.hasClass(customClassName)).toBeTruthy()
  })
})

describe('HTML props', () => {
  test('Can render default HTML props', () => {
    const wrapper = render(<ButtonWithOptions data-cy="blue" />)

    expect(wrapper.attr('data-cy')).toBe('blue')
  })
})

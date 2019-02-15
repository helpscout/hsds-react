import * as React from 'react'
import { mount, render } from 'enzyme'
import { Popover } from '../Popover'

describe('className', () => {
  test('Has default className', () => {
    const wrapper = render(<Popover />)

    expect(wrapper.hasClass('c-Popover')).toBeTruthy()
  })

  test('Can render custom className', () => {
    const customClassName = 'blue'
    const wrapper = render(<Popover className={customClassName} />)

    expect(wrapper.hasClass(customClassName)).toBeTruthy()
  })
})

describe('HTML props', () => {
  test('Can render default HTML props', () => {
    const wrapper = render(<Popover data-cy="blue" />)

    expect(wrapper.attr('data-cy')).toBe('blue')
  })
})

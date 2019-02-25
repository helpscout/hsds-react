import * as React from 'react'
import { mount, render } from 'enzyme'
import { Nav } from '../Nav'

describe('className', () => {
  test('Has default className', () => {
    const wrapper = render(<Nav />)

    expect(wrapper.hasClass('c-Nav')).toBeTruthy()
  })

  test('Can render custom className', () => {
    const customClassName = 'blue'
    const wrapper = render(<Nav className={customClassName} />)

    expect(wrapper.hasClass(customClassName)).toBeTruthy()
  })
})

describe('HTML props', () => {
  test('Can render default HTML props', () => {
    const wrapper = render(<Nav data-cy="blue" />)

    expect(wrapper.attr('data-cy')).toBe('blue')
  })
})

import * as React from 'react'
import { mount, render } from 'enzyme'
import { <%= name %> } from '../<%= name %>'

describe('className', () => {
  test('Has default className', () => {
    const wrapper = render(<<%= name %> />)

    expect(wrapper.hasClass('c-<%= name %>')).toBeTruthy()
  })

  test('Can render custom className', () => {
    const customClassName = 'blue'
    const wrapper = render(<<%= name %> className={customClassName} />)

    expect(wrapper.hasClass(customClassName)).toBeTruthy()
  })
})

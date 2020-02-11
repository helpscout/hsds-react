import React from 'react'
import { mount } from 'enzyme'
import <%= name %> from '../<%= name %>'

describe('className', () => {
  test('Has default className', () => {
    const wrapper = mount(<<%= name %> />)

    expect(wrapper.hasClass('c-<%= name %>')).toBeTruthy()
  })

  test('Can render custom className', () => {
    const customClassName = 'blue'
    const wrapper = mount(<<%= name %> className={customClassName} />)

    expect(wrapper.hasClass(customClassName)).toBeTruthy()
  })
})

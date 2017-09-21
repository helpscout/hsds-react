import React from 'react'
import { mount } from 'enzyme'
import Emoji from '..'

test('Renders with a default size', () => {
  const defaultSize = 20
  const wrapper = mount(<Emoji emoji=':santa:' />)

  expect(wrapper.props().size).toBe(defaultSize)
  wrapper.unmount()
})

test('Can override default size', () => {
  const newSize = 64
  const wrapper = mount(<Emoji emoji=':santa:' size={newSize} />)

  expect(wrapper.props().size).toBe(newSize)
  wrapper.unmount()
})

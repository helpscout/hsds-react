import React from 'react'
import { mount } from 'enzyme'
import Provider from '../Provider'
import Message from '../Message'

test('Provides child components with props as context', () => {
  const wrapper = mount(
    <Provider theme='embed'>
      <Message />
    </Provider>
  )
  let o = wrapper.find(Message).node
  expect(o.context.theme).toBe('embed')

  wrapper.setProps({ theme: 'admin' })
  o = wrapper.find(Message).node

  expect(o.context.theme).toBe('admin')
})

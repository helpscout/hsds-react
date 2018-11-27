import React from 'react'
import { mount } from 'enzyme'
import Provider from '../Provider'
import Message from '../Message'

const ui = {
  message: '.c-Message',
}

test('Provides child components with props as context', () => {
  const wrapper = mount(
    <Provider theme="embed">
      <Message />
    </Provider>
  )
  let o = wrapper.find(ui.message).first()
  expect(o.getDOMNode().classList.contains('is-theme-embed')).toBe(true)

  wrapper.setProps({ theme: 'admin' })
  o = wrapper.find(ui.message).first()
  expect(o.getDOMNode().classList.contains('is-theme-admin')).toBe(true)
})

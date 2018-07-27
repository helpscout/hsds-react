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
  const o = wrapper.find(ui.message)
  expect(o.props().className).toContain('is-theme-embed')

  wrapper.setProps({ theme: 'admin' })
  expect(o.props().className).toContain('is-theme-admin')
})

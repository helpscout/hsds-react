import React from 'react'
import PropTypes from 'prop-types'
import { mount } from 'enzyme'
import Provider from '../Message.Provider'
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
})

test('Changes context for children components on theme prop change', () => {
  class Sample extends React.Component {
    static contextTypes = {
      theme: () => {},
    }
    render() {
      return null
    }
  }
  const wrapper = mount(
    <Provider theme="embed">
      <Sample />
    </Provider>
  )
  wrapper.setProps({ theme: 'admin' })
  wrapper.update()

  const el = wrapper.find('Sample')
  expect(el.instance().context.theme).toBe('admin')
})

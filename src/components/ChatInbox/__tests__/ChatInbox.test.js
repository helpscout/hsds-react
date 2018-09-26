import React from 'react'
import { mount } from 'enzyme'
import ChatInbox from '../ChatInbox'
import Content from '../Content'
import Header from '../Header'
import { Collapsible } from '../../index'
import { baseComponentTest } from '../../../tests/helpers/components'

const baseComponentOptions = {
  className: 'c-ChatInbox',
}

baseComponentTest(ChatInbox, baseComponentOptions)

describe('Header', () => {
  test('Enhance Header component with props', () => {
    const wrapper = mount(
      <ChatInbox isCollapsed isCollapsible>
        <ChatInbox.Header />
      </ChatInbox>
    )
    const o = wrapper.find(ChatInbox.Header)

    expect(o.props().isCollapsible).toBe(true)
    expect(o.props().isCollapsed).toBe(true)

    wrapper.setProps({ isCollapsible: false })

    expect(o.props().isCollapsible).toBe(false)
  })

  test('Clicking header should change isCollapsed prop', () => {
    const wrapper = mount(
      <ChatInbox isCollapsible isCollapsed={false}>
        <ChatInbox.Header />
      </ChatInbox>
    )
    const o = wrapper.find(ChatInbox.Header)

    o.simulate('click')

    expect(wrapper.state().isCollapsed).toBe(true)
    expect(o.props().isCollapsed).toBe(true)
  })

  test('onClick callback should still fire', () => {
    const spy = jest.fn()
    const wrapper = mount(
      <ChatInbox isCollapsible>
        <ChatInbox.Header onClick={spy} />
      </ChatInbox>
    )
    const o = wrapper.find(ChatInbox.Header)

    o.simulate('click')

    expect(spy).toHaveBeenCalled()
  })
})

describe('Content', () => {
  test('Does not wrap Content in Collapsible by default', () => {
    const wrapper = mount(
      <ChatInbox>
        <ChatInbox.Content>Mugatu</ChatInbox.Content>
      </ChatInbox>
    )
    const o = wrapper.find(Collapsible)
    const content = wrapper.find(ChatInbox.Content)

    expect(o.length).not.toBeTruthy()
    expect(content.length).toBeTruthy()
  })

  test('Wraps Content in Collapsible, if isCollapsible', () => {
    const wrapper = mount(
      <ChatInbox isCollapsible isCollapsed={false}>
        <ChatInbox.Content />
      </ChatInbox>
    )
    const o = wrapper.find(Collapsible)
    const content = o.find(ChatInbox.Content)

    expect(o.length).toBeTruthy()
    expect(content.length).toBeTruthy()
  })

  test('Can toggle Collapsible with prop change', () => {
    const wrapper = mount(
      <ChatInbox isCollapsible>
        <ChatInbox.Content>Mugatu</ChatInbox.Content>
      </ChatInbox>
    )
    wrapper.setProps({ isCollapsible: false })
    const o = wrapper.find(Collapsible)

    expect(o.length).toBe(0)
  })
})

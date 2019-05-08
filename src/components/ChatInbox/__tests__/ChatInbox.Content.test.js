import React from 'react'
import { mount } from 'enzyme'
import Content from '../ChatInbox.Content'

describe('ClassName', () => {
  test('Has default className', () => {
    const wrapper = mount(<Content />)
    const el = wrapper.find('div.c-ChatInboxContent')

    expect(el.length).toBe(1)
  })

  test('Applies custom className if specified', () => {
    const customClass = 'piano-key-neck-tie'
    const wrapper = mount(<Content className={customClass} />)
    const el = wrapper.find('div.c-ChatInboxContent')

    expect(el.hasClass(customClass)).toBeTruthy()
  })
})

describe('Children', () => {
  test('Renders child content', () => {
    const wrapper = mount(
      <Content>
        <div className="child">Hello</div>
      </Content>
    )
    const el = wrapper.find('div.child')

    expect(el.text()).toContain('Hello')
  })
})

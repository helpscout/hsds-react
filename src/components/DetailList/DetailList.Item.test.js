import React from 'react'
import { mount } from 'enzyme'
import Item from './DetailList.Item'

describe('ClassName', () => {
  test('Has default className', () => {
    const wrapper = mount(<Item />)
    const el = wrapper.find('dd.c-DetailListItem')

    expect(el.length).toBe(1)
  })

  test('Applies custom className if specified', () => {
    const customClass = 'piano-key-neck-tie'
    const wrapper = mount(<Item className={customClass} />)
    const el = wrapper.find('dd.c-DetailListItem')

    expect(el.hasClass(customClass)).toBeTruthy()
  })
})

describe('Children', () => {
  test('Renders child', () => {
    const wrapper = mount(
      <Item>
        <div className="child">Hello</div>
      </Item>
    )
    const el = wrapper.find('div.child')

    expect(el.text()).toContain('Hello')
  })
})

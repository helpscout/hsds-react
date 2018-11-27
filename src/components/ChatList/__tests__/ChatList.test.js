import React from 'react'
import { mount } from 'enzyme'
import ChatList from '../ChatList'
import BlankSlate from '../BlankSlate'
import Item from '../Item'

describe('ClassName', () => {
  test('Has default className', () => {
    const wrapper = mount(<ChatList />)
    const el = wrapper.find('div.c-ChatList')

    expect(el.length).toBe(1)
  })

  test('Applies custom className if specified', () => {
    const customClass = 'piano-key-neck-tie'
    const wrapper = mount(<ChatList className={customClass} />)
    const el = wrapper.find('div.c-ChatList')

    expect(el.hasClass(customClass)).toBeTruthy()
  })
})

describe('Children', () => {
  test('Renders child', () => {
    const wrapper = mount(
      <ChatList>
        <div className="child">Hello</div>
      </ChatList>
    )
    const el = wrapper.find('div.child')

    expect(el.text()).toContain('Hello')
  })
})

describe('Items', () => {
  test('Renders BlankSlate if childless', () => {
    const wrapper = mount(<ChatList />)
    const blankSlate = wrapper.find(BlankSlate)
    const item = wrapper.find(Item)

    expect(blankSlate.length).toBeTruthy()
    expect(item.length).not.toBeTruthy()
  })

  test('Can render ChatList.Item, and does not render BlankSlate', () => {
    const wrapper = mount(
      <ChatList>
        <Item />
        <Item />
        <Item />
      </ChatList>
    )
    const blankSlate = wrapper.find(BlankSlate)
    const item = wrapper.find(Item)

    expect(blankSlate.length).toBe(0)
    expect(item.length).toBe(3)
  })
})

describe('Sub-components', () => {
  test('Exports the correct sub-components', () => {
    expect(ChatList.BlankSlate).toBe(BlankSlate)
    expect(ChatList.Item).toBe(Item)
  })
})

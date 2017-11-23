import React from 'react'
import { shallow } from 'enzyme'
import ChatList from '../ChatList'
import BlankSlate from '../BlankSlate'
import Item from '../Item'
import { baseComponentTest } from '../../../tests/helpers/components'

const baseComponentOptions = {
  className: 'c-ChatList'
}

baseComponentTest(ChatList, baseComponentOptions)

describe('Items', () => {
  test('Renders BlankSlate if childless', () => {
    const wrapper = shallow(<ChatList />)
    const blankSlate = wrapper.find(BlankSlate)
    const item = wrapper.find(Item)

    expect(blankSlate.length).toBeTruthy()
    expect(item.length).not.toBeTruthy()
  })

  test('Can render ChatList.Item, and does not render BlankSlate', () => {
    const wrapper = shallow(
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

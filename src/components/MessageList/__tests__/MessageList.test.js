import * as React from 'react'
import { mount, shallow, render } from 'enzyme'
import MessageList from '../MessageList'
import mockItems from './mockItems'
import { AccordionUI } from '../styles/MessageList.css'
import MessageRow from '../MessageRow'

const defaultProps = {
  items: mockItems,
  onSortEnd: jest.fn(() => {}),
  onSortStart: jest.fn(() => {}),
}

describe('message list', () => {
  test('should render 8 mock items', () => {
    const wrapper = mount(<MessageList {...defaultProps} />)
    const rows = wrapper.find(MessageRow)
    expect(rows.length).toEqual(8)
  })
  test('if not items, should return null', () => {
    const wrapper = mount(<MessageList {...{ ...defaultProps, items: [] }} />)
    const rows = wrapper.find(MessageRow)
    expect(rows.length).toEqual(0)
  })
  test('should render AccordionUI', () => {
    const wrapper = mount(<MessageList {...defaultProps} />)
    const element = wrapper.find(AccordionUI)
    expect(element.length).toEqual(1)
  })
})

describe('message list sorting', () => {
  test('should set state and call back onSortStart', () => {
    const wrapper = mount(<MessageList {...defaultProps} />)
    wrapper.instance().onSortStart({
      node: {},
      isKeySorting: false,
      collection: {},
      index: 1,
    })
    expect(wrapper.state().isDragging).toEqual(true)
    expect(wrapper.state().indexOfDraggedItem).toEqual(1)
    expect(defaultProps.onSortStart).toHaveBeenCalledTimes(1)
    expect(defaultProps.onSortStart).toHaveBeenCalledWith({
      collection: {},
      index: 1,
      node: {},
      isDragging: true,
      isKeySorting: false,
    })
  })
  test('should set state and call back onSortEnd', () => {
    const wrapper = mount(<MessageList {...defaultProps} />)
    wrapper.instance().onSortEnd({
      collection: {},
      isKeySorting: false,
      oldIndex: 1,
      newIndex: 3,
    })
    expect(wrapper.state().isDragging).toEqual(false)
    expect(wrapper.state().indexOfDraggedItem).toEqual(-1)
    expect(defaultProps.onSortEnd).toHaveBeenCalledTimes(1)
    expect(defaultProps.onSortEnd).toHaveBeenCalledWith({
      collection: {},
      isDragging: false,
      isKeySorting: false,
      oldIndex: 1,
      newIndex: 3,
    })
  })
})

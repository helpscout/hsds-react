import React from 'react'
import { shallow } from 'enzyme'
import Item from '../Item'
import { Flexy } from '../../index'

describe('ClassName', () => {
  test('Has default className', () => {
    const wrapper = shallow(
      <Item>
        <div className="mugatu">That Hansel!</div>
      </Item>
    )

    expect(wrapper.hasClass('c-ToolbarItem')).toBe(true)
  })

  test('Applies custom className if specified', () => {
    const customClass = 'piano-key-neck-tie'
    const wrapper = shallow(
      <Item className={customClass}>
        <div className="mugatu">That Hansel!</div>
      </Item>
    )

    expect(wrapper.hasClass(customClass)).toBe(true)
  })
})

describe('Children', () => {
  test('Can render children', () => {
    const wrapper = shallow(
      <Item>
        <div className="mugatu">That Hansel!</div>
      </Item>
    )
    const o = wrapper.find('.mugatu')

    expect(o.length).toBe(1)
  })
})

describe('Childless', () => {
  test('Renders nothing', () => {
    const wrapper = shallow(<Item />)
    const div = wrapper.find('div')

    expect(div.length).toBe(0)
  })

  test('Renders nothing with null children', () => {
    const wrapper = shallow(<Item>{null}</Item>)
    const div = wrapper.find('div')

    expect(div.length).toBe(0)
  })
})

describe('Flexy', () => {
  test('Is constructed using Flexy.Item', () => {
    const wrapper = shallow(
      <Item>
        <div className="mugatu">That Hansel!</div>
      </Item>
    )

    const o = wrapper.find(Flexy.Item)

    expect(o.length).toBe(1)
    expect(o.hasClass('c-ToolbarItem')).toBe(true)
  })
})

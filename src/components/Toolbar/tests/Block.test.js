import React from 'react'
import { shallow } from 'enzyme'
import Block from '../Block'
import { Flexy } from '../../index'

describe('ClassName', () => {
  test('Has default className', () => {
    const wrapper = shallow(<Block />)

    expect(wrapper.hasClass('c-ToolbarBlock')).toBe(true)
  })

  test('Applies custom className if specified', () => {
    const customClass = 'piano-key-neck-tie'
    const wrapper = shallow(<Block className={customClass} />)

    expect(wrapper.hasClass(customClass)).toBe(true)
  })
})

describe('Children', () => {
  test('Can render children', () => {
    const wrapper = shallow(
      <Block>
        <div className="mugatu">That Hansel!</div>
      </Block>
    )
    const o = wrapper.find('.mugatu')

    expect(o.length).toBe(1)
  })
})

describe('Flexy', () => {
  test('Is constructed using Flexy.Block', () => {
    const wrapper = shallow(<Block />)
    const o = wrapper.find(Flexy.Block)

    expect(o.length).toBe(1)
    expect(o.hasClass('c-ToolbarBlock')).toBe(true)
  })
})

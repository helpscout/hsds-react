import React from 'react'
import { shallow } from 'enzyme'
import { Block } from '../Toolbar.Block'
import { Flexy } from '../../index'

describe('ClassName', () => {
  test('Has default className', () => {
    const wrapper = shallow(
      <Block>
        <div className="mugatu">That Hansel!</div>
      </Block>
    )

    expect(wrapper.hasClass('c-ToolbarBlock')).toBe(true)
  })

  test('Applies custom className if specified', () => {
    const customClass = 'piano-key-neck-tie'
    const wrapper = shallow(
      <Block className={customClass}>
        <div className="mugatu">That Hansel!</div>
      </Block>
    )

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

describe('Childless', () => {
  test('Renders nothing', () => {
    const wrapper = shallow(<Block />)
    const div = wrapper.find('div')

    expect(div.length).toBe(0)
  })

  test('Renders nothing with null children', () => {
    const wrapper = shallow(<Block>{null}</Block>)
    const div = wrapper.find('div')

    expect(div.length).toBe(0)
  })
})

describe('Flexy', () => {
  test('Is constructed using Flexy.Block', () => {
    const wrapper = shallow(
      <Block>
        <div className="mugatu">That Hansel!</div>
      </Block>
    )

    const o = wrapper.find(Flexy.Block)

    expect(o.length).toBe(1)
    expect(o.hasClass('c-ToolbarBlock')).toBe(true)
  })
})

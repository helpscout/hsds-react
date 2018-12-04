import React from 'react'
import { mount } from 'enzyme'
import Block from '../Block'
import Item from '../Item'

describe('ClassName', () => {
  test('Has default component className', () => {
    const wrapper = mount(<Block />)
    const el = wrapper.find('div.c-ControlGroupBlock')

    expect(el.hasClass('c-ControlGroupBlock')).toBe(true)
  })

  test('Applies custom className if specified', () => {
    const className = 'gator'
    const wrapper = mount(<Block className={className} />)
    const el = wrapper.find('div.c-ControlGroupBlock')

    expect(el.hasClass(className)).toBe(true)
  })
})

describe('Content', () => {
  test('Can render children', () => {
    const wrapper = mount(
      <Block>
        <button />
      </Block>
    )

    expect(wrapper.find('button').length).toBe(1)
  })
})

describe('Item', () => {
  test('Renders a ControlGroup.Item', () => {
    const wrapper = mount(<Block />)
    const o = wrapper.find(Item)

    expect(o.length).toBe(1)
    expect(o.prop('isBlock')).toBe(true)
  })
})

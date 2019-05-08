import React from 'react'
import { mount } from 'enzyme'
import Item from '../ControlGroup.Item'
import Input from '../../Input'
import Select from '../../Select'

describe('ClassName', () => {
  test('Has default component className', () => {
    const wrapper = mount(<Item />)
    const el = wrapper.find('div.c-ControlGroupItem')

    expect(el.hasClass('c-ControlGroupItem')).toBe(true)
  })

  test('Applies custom className if specified', () => {
    const className = 'gator'
    const wrapper = mount(<Item className={className} />)
    const el = wrapper.find('div.c-ControlGroupItem')

    expect(el.hasClass(className)).toBe(true)
  })
})

describe('Content', () => {
  test('Can render children', () => {
    const wrapper = mount(
      <Item>
        <button />
      </Item>
    )

    expect(wrapper.find('button').length).toBe(1)
  })

  test('Can render control Component', () => {
    const wrapper = mount(
      <Item>
        <Input />
      </Item>
    )

    expect(wrapper.find('Input').length).toBe(1)
  })
})

describe('Control', () => {
  test('Enhances control components with positioning props', () => {
    const wrapper = mount(
      <div>
        <Item isFirst>
          <Select />
        </Item>
        <Item isNotOnly>
          <Input />
        </Item>
        <Item isNotOnly>
          <button />
        </Item>
        <Item isLast>
          <Input.AddOn />
        </Item>
      </div>
    )

    expect(wrapper.find(Select).prop('isFirst')).toBe(true)
    expect(wrapper.find(Input).prop('isNotOnly')).toBe(true)
    expect(wrapper.find(Input.AddOn).prop('isLast')).toBe(true)
    expect(wrapper.find('button').prop('isNotOnly')).toBe(undefined)
  })
})

import React from 'react'
import { mount } from 'enzyme'
import ControlGroup from './ControlGroup'
import Block from './ControlGroup.Block'
import Item from './ControlGroup.Item'
import Input from '../Input'
import Select from '../Select'

describe('ControlGroup ClassName', () => {
  test('Has default component className', () => {
    const wrapper = mount(<ControlGroup />)
    const el = wrapper.find('div.c-ControlGroup')

    expect(el.hasClass('c-ControlGroup')).toBe(true)
  })

  test('Applies custom className if specified', () => {
    const className = 'gator'
    const wrapper = mount(<ControlGroup className={className} />)
    const el = wrapper.find('div.c-ControlGroup')

    expect(el.hasClass(className)).toBe(true)
  })
})

describe('ControlGroup Item', () => {
  test('Can render a ControlGroup.Item', () => {
    const wrapper = mount(
      <ControlGroup>
        <ControlGroup.Item>
          <button />
        </ControlGroup.Item>
      </ControlGroup>
    )

    const o = wrapper.find('div.c-ControlGroupItem')

    expect(o.length).toBe(1)
    expect(o.find('button').length).toBe(1)
  })

  test('Passes the placement order prop to Item', () => {
    const wrapper = mount(
      <ControlGroup>
        <ControlGroup.Item />
        <ControlGroup.Item />
        <ControlGroup.Item />
      </ControlGroup>
    )

    expect(
      wrapper
        .find(ControlGroup.Item)
        .at(0)
        .prop('isFirst')
    ).toBe(true)
    expect(
      wrapper
        .find(ControlGroup.Item)
        .at(0)
        .prop('isNotOnly')
    ).toBe(false)
    expect(
      wrapper
        .find(ControlGroup.Item)
        .at(0)
        .prop('isLast')
    ).toBe(false)

    expect(
      wrapper
        .find(ControlGroup.Item)
        .at(1)
        .prop('isFirst')
    ).toBe(false)
    expect(
      wrapper
        .find(ControlGroup.Item)
        .at(1)
        .prop('isNotOnly')
    ).toBe(true)
    expect(
      wrapper
        .find(ControlGroup.Item)
        .at(1)
        .prop('isLast')
    ).toBe(false)

    expect(
      wrapper
        .find(ControlGroup.Item)
        .at(2)
        .prop('isFirst')
    ).toBe(false)
    expect(
      wrapper
        .find(ControlGroup.Item)
        .at(2)
        .prop('isNotOnly')
    ).toBe(false)
    expect(
      wrapper
        .find(ControlGroup.Item)
        .at(2)
        .prop('isLast')
    ).toBe(true)
  })

  test('Placement order considers non-ControlGroup.Item', () => {
    const wrapper = mount(
      <ControlGroup>
        <div />
        <ControlGroup.Item />
        <ControlGroup.Item />
      </ControlGroup>
    )

    expect(
      wrapper
        .find(ControlGroup.Item)
        .at(0)
        .prop('isFirst')
    ).toBe(false)
    expect(
      wrapper
        .find(ControlGroup.Item)
        .at(0)
        .prop('isNotOnly')
    ).toBe(true)
    expect(
      wrapper
        .find(ControlGroup.Item)
        .at(0)
        .prop('isLast')
    ).toBe(false)

    expect(
      wrapper
        .find(ControlGroup.Item)
        .at(1)
        .prop('isFirst')
    ).toBe(false)
    expect(
      wrapper
        .find(ControlGroup.Item)
        .at(1)
        .prop('isNotOnly')
    ).toBe(false)
    expect(
      wrapper
        .find(ControlGroup.Item)
        .at(1)
        .prop('isLast')
    ).toBe(true)
  })
})

describe('ControlGroup Block', () => {
  test('Can render a ControlGroup.Block', () => {
    const wrapper = mount(
      <ControlGroup>
        <ControlGroup.Block>
          <button />
        </ControlGroup.Block>
      </ControlGroup>
    )

    const o = wrapper.find(ControlGroup.Block)

    expect(o.length).toBe(1)
    expect(o.find('button').length).toBe(1)
  })

  test('Passes the placement order prop to Block', () => {
    const wrapper = mount(
      <ControlGroup>
        <ControlGroup.Item />
        <ControlGroup.Item />
        <ControlGroup.Block />
      </ControlGroup>
    )

    expect(
      wrapper
        .find(ControlGroup.Item)
        .at(0)
        .prop('isFirst')
    ).toBe(true)
    expect(
      wrapper
        .find(ControlGroup.Item)
        .at(0)
        .prop('isNotOnly')
    ).toBe(false)
    expect(
      wrapper
        .find(ControlGroup.Item)
        .at(0)
        .prop('isLast')
    ).toBe(false)

    expect(
      wrapper
        .find(ControlGroup.Item)
        .at(1)
        .prop('isFirst')
    ).toBe(false)
    expect(
      wrapper
        .find(ControlGroup.Item)
        .at(1)
        .prop('isNotOnly')
    ).toBe(true)
    expect(
      wrapper
        .find(ControlGroup.Item)
        .at(1)
        .prop('isLast')
    ).toBe(false)

    expect(wrapper.find(ControlGroup.Block).prop('isFirst')).toBe(false)
    expect(wrapper.find(ControlGroup.Block).prop('isNotOnly')).toBe(false)
    expect(wrapper.find(ControlGroup.Block).prop('isLast')).toBe(true)
  })
})

describe('ControlGroup.Block ClassName', () => {
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

describe('ControlGroup.Block Content', () => {
  test('Can render children', () => {
    const wrapper = mount(
      <Block>
        <button />
      </Block>
    )

    expect(wrapper.find('button').length).toBe(1)
  })
})

describe('ControlGroup.Block Item', () => {
  test('Renders a ControlGroup.Item', () => {
    const wrapper = mount(<Block />)
    const o = wrapper.find(Item)

    expect(o.length).toBe(1)
    expect(o.prop('isBlock')).toBe(true)
  })
})

describe('ControlGroup.Item ClassName', () => {
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

describe('ControlGroup.Item Content', () => {
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

describe('ControlGroup.Item Control', () => {
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
  })
})

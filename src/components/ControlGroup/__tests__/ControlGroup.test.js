import React from 'react'
import { mount } from 'enzyme'
import ControlGroup from '../ControlGroup'

describe('ClassName', () => {
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

describe('Item', () => {
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

describe('Block', () => {
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

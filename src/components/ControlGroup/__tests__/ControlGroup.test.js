import React from 'react'
import { mount } from 'enzyme'
import ControlGroup from '../ControlGroup'

describe('ClassName', () => {
  test('Has default component className', () => {
    const wrapper = mount(<ControlGroup />)

    expect(wrapper.hasClass('c-ControlGroup')).toBe(true)
  })

  test('Applies custom className if specified', () => {
    const className = 'gator'
    const wrapper = mount(<ControlGroup className={className} />)

    expect(wrapper.hasClass(className)).toBe(true)
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

    const o = wrapper.find('Item')

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
        .find('Item')
        .at(0)
        .prop('isFirst')
    ).toBe(true)
    expect(
      wrapper
        .find('Item')
        .at(0)
        .prop('isNotOnly')
    ).toBe(false)
    expect(
      wrapper
        .find('Item')
        .at(0)
        .prop('isLast')
    ).toBe(false)

    expect(
      wrapper
        .find('Item')
        .at(1)
        .prop('isFirst')
    ).toBe(false)
    expect(
      wrapper
        .find('Item')
        .at(1)
        .prop('isNotOnly')
    ).toBe(true)
    expect(
      wrapper
        .find('Item')
        .at(1)
        .prop('isLast')
    ).toBe(false)

    expect(
      wrapper
        .find('Item')
        .at(2)
        .prop('isFirst')
    ).toBe(false)
    expect(
      wrapper
        .find('Item')
        .at(2)
        .prop('isNotOnly')
    ).toBe(false)
    expect(
      wrapper
        .find('Item')
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
        .find('Item')
        .at(0)
        .prop('isFirst')
    ).toBe(false)
    expect(
      wrapper
        .find('Item')
        .at(0)
        .prop('isNotOnly')
    ).toBe(true)
    expect(
      wrapper
        .find('Item')
        .at(0)
        .prop('isLast')
    ).toBe(false)

    expect(
      wrapper
        .find('Item')
        .at(1)
        .prop('isFirst')
    ).toBe(false)
    expect(
      wrapper
        .find('Item')
        .at(1)
        .prop('isNotOnly')
    ).toBe(false)
    expect(
      wrapper
        .find('Item')
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

    const o = wrapper.find('Block')

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
        .find('Item')
        .at(0)
        .prop('isFirst')
    ).toBe(true)
    expect(
      wrapper
        .find('Item')
        .at(0)
        .prop('isNotOnly')
    ).toBe(false)
    expect(
      wrapper
        .find('Item')
        .at(0)
        .prop('isLast')
    ).toBe(false)

    expect(
      wrapper
        .find('Item')
        .at(1)
        .prop('isFirst')
    ).toBe(false)
    expect(
      wrapper
        .find('Item')
        .at(1)
        .prop('isNotOnly')
    ).toBe(true)
    expect(
      wrapper
        .find('Item')
        .at(1)
        .prop('isLast')
    ).toBe(false)

    expect(wrapper.find('Block').prop('isFirst')).toBe(false)
    expect(wrapper.find('Block').prop('isNotOnly')).toBe(false)
    expect(wrapper.find('Block').prop('isLast')).toBe(true)
  })
})

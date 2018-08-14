import React from 'react'
import { mount } from 'enzyme'
import Button from '../index'
import PropProvider from '../../PropProvider'

describe('Button/Index', () => {
  test('Renders Button V1 by default', () => {
    const wrapper = mount(<Button />)
    const o = wrapper.find('Button').last()

    expect(o.type().BlueComponentVersion).toBe(1)
  })

  test('Can render Button V2, if specified by prop', () => {
    const wrapper = mount(<Button version={2} />)
    const o = wrapper.find('Button').last()

    expect(o.type().BlueComponentVersion).toBe(2)
  })

  test('Falls back Button V1, if version prop is invalid', () => {
    const wrapper = mount(<Button version={3} />)
    const o = wrapper.find('Button').last()

    expect(o.type().BlueComponentVersion).toBe(1)
  })

  test('Can be set using PropProvider', () => {
    const config = {
      Button: {
        version: 2,
      },
    }
    const wrapper = mount(
      <PropProvider value={config}>
        <Button />
      </PropProvider>
    )
    let o = wrapper.find('Button').last()

    expect(o.type().BlueComponentVersion).toBe(2)

    wrapper.setProps({
      value: {
        Button: {
          version: 1,
        },
      },
    })

    o = wrapper.find('Button').last()
    expect(o.type().BlueComponentVersion).toBe(1)
  })
})

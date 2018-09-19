import React from 'react'
import { mount } from 'enzyme'
import Flexy from '../Flexy'

describe('ClassName', () => {
  test('Has default className', () => {
    const wrapper = mount(<Flexy />)

    expect(wrapper.hasClass('c-Flexy')).toBeTruthy()
  })

  test('Applies custom className if specified', () => {
    const customClass = 'piano-key-neck-tie'
    const wrapper = mount(<Flexy className={customClass} />)

    expect(wrapper.prop('className')).toContain(customClass)
  })
})

describe('Children', () => {
  test('Renders child content', () => {
    const wrapper = mount(
      <Flexy>
        <div className="child">Hello</div>
      </Flexy>
    )
    const el = wrapper.find('div.child')

    expect(el.text()).toContain('Hello')
  })
})

describe('Styles', () => {
  test('Applies vertical alignment styles', () => {
    const wrapper = mount(
      <Flexy align="top">
        <Flexy.Item>Hello</Flexy.Item>
      </Flexy>
    )

    expect(wrapper.hasClass('is-align-top')).toBe(true)
  })

  test('Applies horizontal alignment styles', () => {
    const wrapper = mount(
      <Flexy just="right">
        <Flexy.Item>Hello</Flexy.Item>
      </Flexy>
    )

    expect(wrapper.hasClass('is-just-right')).toBe(true)
  })

  test('Applies spacing styles', () => {
    const wrapper = mount(
      <Flexy gap="lg">
        <Flexy.Item>Hello</Flexy.Item>
      </Flexy>
    )

    expect(wrapper.hasClass('is-gap-lg')).toBe(true)
  })
})

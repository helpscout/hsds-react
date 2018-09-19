import React from 'react'
import { mount } from 'enzyme'
import Flexy from '../Flexy'

describe('ClassName', () => {
  test('Has default className', () => {
    const wrapper = mount(<Flexy.Item />)

    expect(wrapper.hasClass('c-Flexy__item')).toBeTruthy()
  })

  test('Applies custom className if specified', () => {
    const customClass = 'piano-key-neck-tie'
    const wrapper = mount(<Flexy.Item className={customClass} />)

    expect(wrapper.prop('className')).toContain(customClass)
  })
})

describe('Inline', () => {
  test('Applies inline className if specified', () => {
    const wrapper = mount(<Flexy.Item inline />)

    expect(wrapper.hasClass('is-inlineItem')).toBeTruthy()
    expect(wrapper.hasClass('is-inlineDefault')).not.toBeTruthy()
  })
})

describe('Children', () => {
  test('Renders child content', () => {
    const wrapper = mount(
      <Flexy.Item>
        <div className="child">Hello</div>
      </Flexy.Item>
    )
    const el = wrapper.find('div.child')

    expect(el.text()).toContain('Hello')
  })
})

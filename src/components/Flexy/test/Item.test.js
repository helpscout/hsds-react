import React from 'react'
import { shallow } from 'enzyme'
import Flexy from '..'

describe('ClassName', () => {
  test('Has default className', () => {
    const wrapper = shallow(<Flexy.Item />)

    expect(wrapper.hasClass('c-Flexy__item')).toBeTruthy()
  })

  test('Applies custom className if specified', () => {
    const customClass = 'piano-key-neck-tie'
    const wrapper = shallow(<Flexy.Item className={customClass} />)

    expect(wrapper.prop('className')).toContain(customClass)
  })
})

describe('Inline', () => {
  test('Applies inline className if specified', () => {
    const wrapper = shallow(<Flexy.Item inline />)

    expect(wrapper.hasClass('c-Flexy__inline-item')).toBeTruthy()
    expect(wrapper.hasClass('c-Flexy__item')).not.toBeTruthy()
  })
})

describe('Children', () => {
  test('Renders child content', () => {
    const wrapper = shallow(
      <Flexy.Item>
        <div className="child">Hello</div>
      </Flexy.Item>
    )
    const el = wrapper.find('div.child')

    expect(el.text()).toContain('Hello')
  })
})

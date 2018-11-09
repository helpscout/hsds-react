import React from 'react'
import { mount } from 'enzyme'
import Flexy from '../Flexy'

describe('ClassName', () => {
  test('Has default className', () => {
    const wrapper = mount(<Flexy.Block />)

    expect(
      wrapper.getDOMNode().classList.contains('c-Flexy__block')
    ).toBeTruthy()
  })

  test('Applies custom className if specified', () => {
    const customClass = 'piano-key-neck-tie'
    const wrapper = mount(<Flexy.Block className={customClass} />)

    expect(wrapper.getDOMNode().classList.contains(customClass)).toBeTruthy()
  })
})

describe('Children', () => {
  test('Renders child content', () => {
    const wrapper = mount(
      <Flexy.Block>
        <div className="child">Hello</div>
      </Flexy.Block>
    )
    const el = wrapper.find('div.child')

    expect(el.text()).toContain('Hello')
  })
})

import React from 'react'
import { shallow } from 'enzyme'
import Flexy from '..'

describe('ClassName', () => {
  test('Has default className', () => {
    const wrapper = shallow(<Flexy.Block />)

    expect(wrapper.hasClass('c-Flexy__block')).toBeTruthy()
  })

  test('Applies custom className if specified', () => {
    const customClass = 'piano-key-neck-tie'
    const wrapper = shallow(<Flexy.Block className={customClass} />)

    expect(wrapper.prop('className')).toContain(customClass)
  })
})

describe('Children', () => {
  test('Renders child content', () => {
    const wrapper = shallow(<Flexy.Block><div className='child'>Hello</div></Flexy.Block>)
    const el = wrapper.find('div.child')

    expect(el.text()).toContain('Hello')
  })
})

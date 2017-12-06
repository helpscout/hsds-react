import React from 'react'
import { shallow } from 'enzyme'
import Item from '../Item'

describe('ClassName', () => {
  test('Has default className', () => {
    const wrapper = shallow(<Item />)

    expect(wrapper.hasClass('c-InlineItem')).toBeTruthy()
  })

  test('Applies custom className if specified', () => {
    const customClass = 'piano-key-neck-tie'
    const wrapper = shallow(<Item className={customClass} />)

    expect(wrapper.prop('className')).toContain(customClass)
  })
})

describe('Children', () => {
  test('Renders child content', () => {
    const wrapper = shallow(<Item><div className='child'>Hello</div></Item>)
    const el = wrapper.find('div.child')

    expect(el.text()).toContain('Hello')
  })
})

describe('extendChild', () => {
  test('Can extend the child component', () => {
    const wrapper = shallow(<Item extendChild><div className='child'>Hello</div></Item>)
    const el = wrapper.find('div.child')

    expect(el.hasClass('c-InlineItem')).toBe(true)
    expect(el.text()).toContain('Hello')
  })
})

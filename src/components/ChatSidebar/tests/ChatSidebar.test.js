import React from 'react'
import { shallow } from 'enzyme'
import ChatSidebar from '..'

describe('ClassName', () => {
  test('Has default className', () => {
    const wrapper = shallow(<ChatSidebar />)
    const o = wrapper.find('.c-ChatSidebar')

    expect(o.length).toBe(1)
  })

  test('Applies custom className if specified', () => {
    const customClass = 'piano-key-neck-tie'
    const wrapper = shallow(<ChatSidebar className={customClass} />)
    const o = wrapper.find('.c-ChatSidebar')

    expect(o.hasClass(customClass)).toBeTruthy()
  })
})

describe('Children', () => {
  test('Can render children content', () => {
    const wrapper = shallow(<ChatSidebar><div className='child'>Hello</div></ChatSidebar>)
    const o = wrapper.find('div.child')

    expect(o.length).toBe(1)
  })
})

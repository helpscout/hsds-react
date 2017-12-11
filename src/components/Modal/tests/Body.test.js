import React from 'react'
import { shallow } from 'enzyme'
import Body from '../Body'

describe('ClassName', () => {
  test('Has default className', () => {
    const wrapper = shallow(<Body />)

    expect(wrapper.hasClass('c-ModalBody')).toBeTruthy()
  })

  test('Applies custom className if specified', () => {
    const customClass = 'piano-key-neck-tie'
    const wrapper = shallow(<Body className={customClass} />)

    expect(wrapper.prop('className')).toContain(customClass)
  })
})

describe('Children', () => {
  test('Renders child content', () => {
    const wrapper = shallow(<Body><div className='child'>Hello</div></Body>)
    const el = wrapper.find('div.child')

    expect(el.text()).toContain('Hello')
  })
})

import React from 'react'
import { shallow } from 'enzyme'
import Flexy from '..'

describe('ClassName', () => {
  test('Has default className', () => {
    const wrapper = shallow(<Flexy />)

    expect(wrapper.hasClass('o-flexy')).toBeTruthy()
  })

  test('Applies custom className if specified', () => {
    const customClass = 'piano-key-neck-tie'
    const wrapper = shallow(<Flexy className={customClass} />)

    expect(wrapper.prop('className')).toContain(customClass)
  })
})

describe('Children', () => {
  test('Renders child content', () => {
    const wrapper = shallow(<Flexy><div className='child'>Hello</div></Flexy>)
    const el = wrapper.find('div.child')

    expect(el.text()).toContain('Hello')
  })
})

describe('Styles', () => {
  test('Applies vertical alignment styles', () => {
    const wrapper = shallow(<Flexy align='top'><Flexy.Item>Hello</Flexy.Item></Flexy>)

    expect(wrapper.prop('className')).toContain('top')
  })

  test('Applies horizontal alignment styles', () => {
    const wrapper = shallow(<Flexy just='right'><Flexy.Item>Hello</Flexy.Item></Flexy>)

    expect(wrapper.prop('className')).toContain('right')
  })

  test('Applies spacing styles', () => {
    const wrapper = shallow(<Flexy gap='lg'><Flexy.Item>Hello</Flexy.Item></Flexy>)

    expect(wrapper.prop('className')).toContain('gap-lg')
  })
})

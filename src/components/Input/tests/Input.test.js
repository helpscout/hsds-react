import React from 'react'
import { mount, shallow } from 'enzyme'
import Input from '..'
import Resizer from '../Resizer'

describe('ClassName', () => {
  test('Has default className', () => {
    const wrapper = mount(<Input />)
    const input = wrapper.find('.c-Input')
    const field = wrapper.find('.c-InputField')
    const backdrop = wrapper.find('.c-InputBackdrop')

    expect(input.exists()).toBeTruthy()
    expect(field.exists()).toBeTruthy()
    expect(backdrop.exists()).toBeTruthy()
  })

  test('Accepts custom className', () => {
    const className = 'milk-was-a-bad-choice'
    const wrapper = shallow(<Input className={className} />)
    const o = wrapper.find(`.${className}`)

    expect(o.exists()).toBeTruthy()
  })
})

describe('Events', () => {
  test('Can trigger onBlur callback', () => {
    let value = false
    const onBlur = () => { value = true }
    const wrapper = mount(<Input onBlur={onBlur} />)
    const input = wrapper.find('input')

    input.simulate('blur')

    expect(value).toBeTruthy()
  })

  test('Can trigger onClick callback', () => {
    let value = false
    const onClick = () => { value = true }
    const wrapper = mount(<Input onClick={onClick} />)
    const input = wrapper.find('input')

    input.simulate('click')

    expect(value).toBeTruthy()
  })

  test('Can trigger onFocus callback', () => {
    let value = false
    const onFocus = () => { value = true }
    const wrapper = mount(<Input onFocus={onFocus} />)
    const input = wrapper.find('input')

    input.simulate('focus')

    expect(value).toBeTruthy()
  })
})

describe('Multiline', () => {
  test('Default selector is an input', () => {
    const wrapper = shallow(<Input />)
    const o = wrapper.find('.c-InputField')

    expect(o.node.type).toBe('input')
  })

  test('Selector becomes a textarea if multiline is defined', () => {
    const wrapper = shallow(<Input multiline />)
    const o = wrapper.find('.c-InputField')

    expect(o.node.type).toBe('textarea')
  })

  test('Accepts number argument', () => {
    const wrapper = mount(<Input multiline={5} />)
    const o = wrapper.find('.c-InputField')

    expect(o.node.type).toBe('textarea')
  })

  test('Adds Resizer component if multiline is defined', () => {
    const wrapper = mount(<Input multiline />)

    expect(wrapper.find(Resizer).exists()).toBeTruthy()
  })
})

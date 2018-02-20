import React from 'react'
import { mount, shallow } from 'enzyme'
import Input from '..'
import Flexy from '../../Flexy'

describe('ClassName', () => {
  test('Has default className', () => {
    const wrapper = mount(<Input />)
    const backdrop = wrapper.find('.c-InputBackdrop')

    expect(backdrop.exists()).toBeTruthy()
    wrapper.unmount()
  })

  test('Accepts custom className', () => {
    const className = 'milk-was-a-bad-choice'
    const wrapper = shallow(<Input className={className} />)
    const o = wrapper.find(`.${className}`)

    expect(o.exists()).toBeTruthy()
    wrapper.unmount()
  })
})

describe('Autofocus', () => {
  test('Does not autoFocus by default', () => {
    const wrapper = mount(<Input />)
    const input = wrapper.find('input')

    expect(input.prop('autoFocus')).toBeFalsy()
    wrapper.unmount()
  })

  test('Autofocuses if checked', () => {
    const wrapper = mount(<Input checked />)
    const input = wrapper.find('input')

    expect(input.prop('autoFocus')).toBeTruthy()
    wrapper.unmount()
  })
})

describe('Events', () => {
  test('Can trigger onBlur callback', () => {
    const spy = jest.fn()
    const wrapper = mount(<Input onBlur={spy} />)
    const input = wrapper.find('input')

    input.simulate('blur')

    expect(spy).toHaveBeenCalled()
    wrapper.unmount()
  })

  test('Can trigger onFocus callback', () => {
    const spy = jest.fn()
    const wrapper = mount(<Input onFocus={spy} />)
    const input = wrapper.find('input')

    input.simulate('focus')

    expect(spy).toHaveBeenCalled()
    wrapper.unmount()
  })

  test('Can trigger onChange callback', () => {
    const spy = jest.fn()
    const wrapper = mount(<Input onChange={spy} checked value='Value' />)
    const input = wrapper.find('input')

    input.simulate('change')

    expect(spy).toHaveBeenCalledWith('Value', true)
    wrapper.unmount()
  })
})

describe('States', () => {
  test('Applies disabled styles if specified', () => {
    const wrapper = mount(<Input disabled />)
    const o = wrapper.find('.c-ChoiceInput')
    const input = wrapper.find('input')

    expect(o.prop('className')).toContain('is-disabled')
    expect(input.prop('disabled')).toBeTruthy()
    wrapper.unmount()
  })

  test('Applies readOnly styles if specified', () => {
    const wrapper = mount(<Input readOnly />)
    const o = wrapper.find('.c-ChoiceInput')
    const input = wrapper.find('input')

    expect(o.prop('className')).toContain('is-readonly')
    expect(input.prop('readOnly')).toBeTruthy()
    wrapper.unmount()
  })

  test('Applies error styles if specified', () => {
    const wrapper = shallow(<Input state='error' />)

    expect(wrapper.prop('className')).toContain('is-error')
  })

  test('Applies success styles if specified', () => {
    const wrapper = shallow(<Input state='success' />)

    expect(wrapper.prop('className')).toContain('is-success')
  })

  test('Applies warning styles if specified', () => {
    const wrapper = shallow(<Input state='warning' />)

    expect(wrapper.prop('className')).toContain('is-warning')
  })
})

describe('Type', () => {
  test('Applies checkbox styles by default', () => {
    const wrapper = mount(<Input />)
    const o = wrapper.find('.c-ChoiceInput')
    const input = wrapper.find('input')

    expect(o.prop('className')).toContain('is-checkbox')
    expect(input.prop('type')).toBe('checkbox')
    wrapper.unmount()
  })

  test('Applies checkbox styles if specified', () => {
    const wrapper = mount(<Input type='checkbox' />)
    const o = wrapper.find('.c-ChoiceInput')
    const input = wrapper.find('input')

    expect(o.prop('className')).toContain('is-checkbox')
    expect(input.prop('type')).toBe('checkbox')
    wrapper.unmount()
  })

  test('Applies checkbox styles if specified', () => {
    const wrapper = mount(<Input type='radio' />)
    const o = wrapper.find('.c-ChoiceInput')
    const input = wrapper.find('input')

    expect(o.prop('className')).toContain('is-radio')
    expect(input.prop('type')).toBe('radio')
    wrapper.unmount()
  })
})

describe('Styles', () => {
  test('Can apply align styles', () => {
    const wrapper = mount(<Input align='top' />)
    const o = wrapper.find(Flexy)

    expect(o.hasClass('is-top')).toBeTruthy()
    wrapper.unmount()
  })
})

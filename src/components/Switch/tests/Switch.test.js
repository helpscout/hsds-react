import React from 'react'
import { shallow } from 'enzyme'
import { default as Switch, cx } from '..'
import { baseComponentTest } from '../../../tests/helpers/components'

const baseComponentOptions = {
  className: cx.main,
  skipChildrenTest: true
}

baseComponentTest(Switch, baseComponentOptions)

describe('Accessibility', () => {
  test('Has proper aria roles', () => {
    const wrapper = shallow(<Switch />)
    const o = wrapper.find('input').props()

    expect(o['aria-checked'] !== undefined).toBeTruthy()
    expect(o['role']).toBe('switch')
  })

  test('Has proper ID', () => {
    const wrapper = shallow(<Switch />)
    const o = wrapper.find('input').props()

    expect(o.id).toBe(wrapper.find('label').props().htmlFor)
  })
})

describe('Active', () => {
  test('Is false by default', () => {
    const wrapper = shallow(<Switch />)
    const o = wrapper.instance()

    expect(o.props.active).toBeFalsy()
    expect(o.state.active).toBeFalsy()
    expect(wrapper.hasClass('is-active')).not.toBeTruthy()
  })

  test('Can be set to true', () => {
    const wrapper = shallow(<Switch active />)
    const o = wrapper.instance()

    expect(o.state.active).toBeTruthy()
    expect(wrapper.hasClass('is-active')).toBeTruthy()
    expect(wrapper.find('input').props()['aria-checked']).toBeTruthy()
  })

  test('Can be toggled by changing input', () => {
    const wrapper = shallow(<Switch />)
    const input = wrapper.find('input')
    const o = wrapper.instance()

    input.simulate('change')

    expect(o.state.active).toBeTruthy()
  })
})

describe('Events', () => {
  test('onBlur callback can be triggered', () => {
    const spy = jest.fn()
    const wrapper = shallow(<Switch onBlur={spy} />)
    const input = wrapper.find('input')

    input.simulate('blur')

    expect(spy).toHaveBeenCalled()
  })

  test('onChange callback can be triggered', () => {
    const spy = jest.fn()
    const wrapper = shallow(<Switch onChange={spy} value='Mugatu' />)
    const input = wrapper.find('input')

    input.simulate('change')

    expect(spy).toHaveBeenCalledWith('Mugatu')
  })

  test('onFocus callback can be triggered', () => {
    const spy = jest.fn()
    const wrapper = shallow(<Switch onFocus={spy} />)
    const input = wrapper.find('input')

    input.simulate('focus')

    expect(spy).toHaveBeenCalled()
  })
})

describe('ID', () => {
  test('Automatically renders a unique ID', () => {
    const wrapper = shallow(<Switch />)
    const wrapper2 = shallow(<Switch />)
    const o = wrapper.find('input')

    expect(o.props().id).toBeTruthy()
    expect(o.props().id).not.toBe(wrapper2.find('input').props().id)
  })

  test('Can accept custom ID', () => {
    const wrapper = shallow(<Switch id='Mugatu' />)
    const o = wrapper.find('input')

    expect(o.props().id).toBe('Mugatu')
  })
})

describe('State', () => {
  test('Can render error styles', () => {
    const wrapper = shallow(<Switch state='error' />)

    expect(wrapper.hasClass('is-error')).toBeTruthy()
  })
})

describe('Styles', () => {
  test('Can render size styles, if applicable', () => {
    const wrapper = shallow(<Switch size='sm' />)

    expect(wrapper.hasClass(`${cx.main}--sm`)).toBeTruthy()
  })
})

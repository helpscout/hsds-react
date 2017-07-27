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

describe('Autofocus', () => {
  test('Does not autoFocus by default', () => {
    const wrapper = shallow(<Input />)
    const input = wrapper.find('input')

    expect(input.prop('autoFocus')).toBeFalsy()
  })

  test('Autofocuses if specified', () => {
    const wrapper = shallow(<Input autoFocus />)
    const input = wrapper.find('input')

    expect(input.prop('autoFocus')).toBeTruthy()
  })
})

describe('Events', () => {
  test('Can trigger onBlur callback', () => {
    const spy = jest.fn()
    const wrapper = mount(<Input onBlur={spy} />)
    const input = wrapper.find('input')

    input.simulate('blur')

    expect(spy).toHaveBeenCalled()
  })

  test('Can trigger onClick callback', () => {
    const spy = jest.fn()
    const wrapper = mount(<Input onClick={spy} />)
    const input = wrapper.find('input')

    input.simulate('click')

    expect(spy).toHaveBeenCalled()
  })

  test('Can trigger onFocus callback', () => {
    const spy = jest.fn()
    const wrapper = mount(<Input onFocus={spy} />)
    const input = wrapper.find('input')

    input.simulate('focus')

    expect(spy).toHaveBeenCalled()
  })

  test('onChange callback passes selected value', () => {
    const spy = jest.fn()
    const wrapper = mount(<Input onChange={spy} />)
    const input = wrapper.find('input')
    const value = 'Champ Kind'

    input.node.value = value
    input.simulate('change')

    expect(spy).toHaveBeenCalledWith(value)
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

  test('Applies resizable styles if specified', () => {
    const wrapper = shallow(<Input multiline resizable />)
    const o = wrapper.find('.c-Input')

    expect(o.prop('className')).toContain('is-resizable')
  })
})

describe('Prefix/Suffix', () => {
  test('Adds prefix if defined', () => {
    const text = 'Prefix'
    const wrapper = mount(
      <Input prefix={text} />
    )

    expect(wrapper.find('.c-Input__prefix').text()).toBe(text)
  })

  test('Adds suffix if defined', () => {
    const text = 'Prefix'
    const wrapper = mount(
      <Input suffix={text} />
    )

    expect(wrapper.find('.c-Input__suffix').text()).toBe(text)
  })
})

describe('Styles', () => {
  test('Applies seamless styles if specified', () => {
    const wrapper = shallow(<Input seamless />)
    const o = wrapper.find('.c-Input')

    expect(o.prop('className')).toContain('is-seamless')
  })

  test('Applies sizing styles if specified', () => {
    const wrapper = shallow(<Input size='sm' />)
    const o = wrapper.find('.c-InputField')

    expect(o.prop('className')).toContain('is-sm')
  })
})

describe('States', () => {
  test('Applies disabled styles if specified', () => {
    const wrapper = shallow(<Input disabled />)
    const o = wrapper.find('.c-Input')
    const input = wrapper.find('input')

    expect(o.prop('className')).toContain('is-disabled')
    expect(input.prop('disabled')).toBeTruthy()
  })

  test('Applies readOnly styles if specified', () => {
    const wrapper = shallow(<Input readOnly />)
    const o = wrapper.find('.c-Input')
    const input = wrapper.find('input')

    expect(o.prop('className')).toContain('is-readonly')
    expect(input.prop('readOnly')).toBeTruthy()
  })

  test('Applies error styles if specified', () => {
    const wrapper = shallow(<Input error />)
    const o = wrapper.find('.c-Input')

    expect(o.prop('className')).toContain('is-error')
  })

  test('Applies success styles if specified', () => {
    const wrapper = shallow(<Input success />)
    const o = wrapper.find('.c-Input')

    expect(o.prop('className')).toContain('is-success')
  })

  test('Applies warning styles if specified', () => {
    const wrapper = shallow(<Input warning />)
    const o = wrapper.find('.c-Input')

    expect(o.prop('className')).toContain('is-warning')
  })
})

describe('Stateful helper label', () => {
  test('Renders stateful helper label if error is a string', () => {
    const wrapper = shallow(<Input error='Error' />)
    const helperLabel = wrapper.find('.c-InputHelperLabel')

    expect(helperLabel.exists()).toBeTruthy()
    expect(helperLabel.text()).toBe('Error')
  })
})

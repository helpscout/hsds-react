import React from 'react'
import { mount } from 'enzyme'
import Input from './Choice.Input'

describe('ClassName', () => {
  test('Has default className', () => {
    const wrapper = mount(<Input />)
    const backdrop = wrapper.find('.c-InputBackdropV2')

    expect(backdrop.exists()).toBeTruthy()
  })

  test('Accepts custom className', () => {
    const className = 'milk-was-a-bad-choice'
    const wrapper = mount(<Input className={className} />)
    const o = wrapper.find(`.${className}`)

    expect(o.exists()).toBeTruthy()
  })
})

describe('Autofocus', () => {
  test('Does not autoFocus by default', () => {
    const wrapper = mount(<Input />)
    const input = wrapper.find('input')

    expect(input.prop('autoFocus')).toBeFalsy()
  })

  test('Should not autofocuses if checked', () => {
    const wrapper = mount(<Input checked />)
    const input = wrapper.find('input')

    expect(input.prop('autoFocus')).toBeFalsy()
  })

  test('Can set autoFocus', () => {
    const wrapper = mount(<Input autoFocus />)
    const input = wrapper.find('input')

    expect(input.prop('autoFocus')).toBe(true)
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

  test('Can trigger onFocus callback', () => {
    const spy = jest.fn()
    const wrapper = mount(<Input onFocus={spy} />)
    const input = wrapper.find('input')

    input.simulate('focus')

    expect(spy).toHaveBeenCalled()
  })

  test('Can trigger onChange callback', () => {
    const spy = jest.fn()
    const wrapper = mount(<Input onChange={spy} checked value="Value" />)
    const input = wrapper.find('input')

    input.simulate('change')

    expect(spy).toHaveBeenCalled()
  })

  test('Can trigger onEnter callback', () => {
    const spy = jest.fn()
    const wrapper = mount(<Input onEnter={spy} checked value="Value" />)
    const input = wrapper.find('input')

    input.simulate('keydown', { key: 'Enter' })

    expect(spy).toHaveBeenCalled()
  })
})

describe('States', () => {
  test('Applies disabled styles if specified', () => {
    const wrapper = mount(<Input disabled />)
    const o = wrapper.find('div.c-ChoiceInput')
    const input = wrapper.find('input')

    expect(o.prop('className')).toContain('is-disabled')
    expect(input.prop('disabled')).toBeTruthy()
  })

  test('Applies readOnly styles if specified', () => {
    const wrapper = mount(<Input readOnly />)
    const o = wrapper.find('div.c-ChoiceInput')
    const input = wrapper.find('input')

    expect(o.prop('className')).toContain('is-readonly')
    expect(input.prop('readOnly')).toBeTruthy()
  })

  test('Applies error styles if specified', () => {
    const wrapper = mount(<Input state="error" />)
    const o = wrapper.find('div.c-ChoiceInput')

    expect(o.hasClass('is-error')).toBe(true)
  })

  test('Applies success styles if specified', () => {
    const wrapper = mount(<Input state="success" />)
    const o = wrapper.find('div.c-ChoiceInput')

    expect(o.hasClass('is-success')).toBe(true)
  })

  test('Applies warning styles if specified', () => {
    const wrapper = mount(<Input state="warning" />)
    const o = wrapper.find('div.c-ChoiceInput')

    expect(o.hasClass('is-warning')).toBe(true)
  })
})

describe('Type', () => {
  test('Applies checkbox styles by default', () => {
    const wrapper = mount(<Input />)
    const o = wrapper.find('div.c-ChoiceInput')
    const input = wrapper.find('input')

    expect(o.prop('className')).toContain('is-checkbox')
    expect(input.prop('type')).toBe('checkbox')
  })

  test('Applies checkbox styles if specified', () => {
    const wrapper = mount(<Input type="checkbox" />)
    const o = wrapper.find('div.c-ChoiceInput')
    const input = wrapper.find('input')

    expect(o.prop('className')).toContain('is-checkbox')
    expect(input.prop('type')).toBe('checkbox')
  })

  test('Applies checkbox styles if specified', () => {
    const wrapper = mount(<Input type="radio" />)
    const o = wrapper.find('div.c-ChoiceInput')
    const input = wrapper.find('input')

    expect(o.prop('className')).toContain('is-radio')
    expect(input.prop('type')).toBe('radio')
  })
})

describe('Styles', () => {
  test('Can apply align styles', () => {
    const wrapper = mount(<Input align="top" />)
    const o = wrapper.find('div.c-ChoiceInput')

    expect(o.hasClass('is-top')).toBe(true)
  })
})

describe('Icon', () => {
  test('Renders InputRadioUI, if radio + checked', () => {
    const wrapper = mount(<Input type="radio" checked />)

    expect(wrapper.find('div.c-ChoiceInput__radio').length).toBe(1)
  })

  test('Does not render InputRadioUI, if radio + unchecked', () => {
    const wrapper = mount(<Input type="radio" checked={false} />)

    expect(wrapper.find('div.c-ChoiceInput__radio').length).toBe(0)
  })

  test('Renders Icon, if checkbox + checked', () => {
    const wrapper = mount(<Input type="checkbox" checked={true} />)

    expect(wrapper.find('Icon').length).toBe(1)
  })

  test('Does not render Icon, if checkbox + unchecked', () => {
    const wrapper = mount(<Input type="checkbox" checked={false} />)

    expect(wrapper.find('Icon').length).toBe(0)
  })

  test('Renders placeholder if custom radio + unchecked', () => {
    const wrapper = mount(<Input type="radio" kind="custom" checked={false} />)

    expect(wrapper.find('div.c-ChoiceInput__placeholder').length).toBe(1)
    expect(wrapper.find('Icon').length).toBe(0)
  })

  test('Replaces placeholder with Icon, if custom radio + checked', () => {
    const wrapper = mount(<Input type="radio" kind="custom" checked={true} />)

    expect(wrapper.find('div.c-ChoiceInput__placeholder').length).toBe(0)
    expect(wrapper.find('Icon').length).toBe(1)
  })
})

describe('ref', () => {
  test('Can retrieve ref DOM node', () => {
    const spy = jest.fn()
    const wrapper = mount(<Input inputRef={spy} />)
    const o = wrapper.find('input').getDOMNode()

    expect(spy).toHaveBeenCalledWith(o)
  })
})

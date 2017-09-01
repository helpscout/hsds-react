import React from 'react'
import { mount, shallow } from 'enzyme'
import Choice from '..'
import ChoiceInput from '../Input'
import HelpText from '../../HelpText'
import Text from '../../Text'
import VisuallyHidden from '../../VisuallyHidden'

describe('ClassName', () => {
  test('Applies custom className if specified', () => {
    const customClass = 'piano-key-neck-tie'
    const wrapper = shallow(<Choice className={customClass} />)

    expect(wrapper.prop('className')).toContain(customClass)
  })
})

describe('Autofocus', () => {
  test('Does not autoFocus by default', () => {
    const wrapper = mount(<Choice />)
    const input = wrapper.find('input')

    expect(input.prop('autoFocus')).toBeFalsy()
    wrapper.unmount()
  })

  test('Autofocuses if checked', () => {
    const wrapper = mount(<Choice checked />)
    const input = wrapper.find('input')

    expect(input.prop('autoFocus')).toBeTruthy()
    wrapper.unmount()
  })
})

describe('Checked', () => {
  test('Is not checked by default', () => {
    const wrapper = mount(<Choice />)
    const input = wrapper.find('input')

    expect(input.prop('checked')).toBeFalsy()
    wrapper.unmount()
  })

  test('Can be checked if specified', () => {
    const wrapper = mount(<Choice checked />)
    const input = wrapper.find('input')

    expect(input.prop('checked')).toBeTruthy()
    wrapper.unmount()
  })
})

describe('HelpText', () => {
  test('Does not render helpText by default', () => {
    const wrapper = mount(<Choice label='Label' />)
    const text = wrapper.find(HelpText)

    expect(text.length).toBeFalsy()
    wrapper.unmount()
  })

  test('Renders helpText if specified', () => {
    const helpText = 'Help Text'
    const wrapper = mount(<Choice label='Label' helpText={helpText} />)
    const text = wrapper.find(HelpText)

    expect(text.length).toBeTruthy()
    expect(text.text()).toBe(helpText)
    wrapper.unmount()
  })
})

describe('Label', () => {
  test('Renders label if specified', () => {
    const wrapper = mount(<Choice label='Label' />)
    const labelText = wrapper.find('.c-Choice__label-text')
    const label = labelText.find(Text)

    expect(label.length).toBeTruthy()
    expect(label.text()).toBe('Label')
    wrapper.unmount()
  })

  test('Hide label if specified', () => {
    const wrapper = shallow(<Choice hideLabel label='Label' />)
    const labelText = wrapper.find('.c-Choice__label-text')

    expect(labelText.find(Text).length).toBeFalsy()
    expect(labelText.find(VisuallyHidden).length).toBeTruthy()
  })
})

describe('Name', () => {
  test('Sets name on input if specified', () => {
    const wrapper = mount(<Choice name='Brick' />)
    const input = wrapper.find('input')

    expect(input.prop('name')).toBe('Brick')
    wrapper.unmount()
  })
})

describe('Events', () => {
  test('Can trigger onBlur callback', () => {
    const spy = jest.fn()
    const wrapper = mount(<Choice onBlur={spy} />)
    const input = wrapper.find('input')

    input.simulate('blur')

    expect(spy).toHaveBeenCalled()
    wrapper.unmount()
  })

  test('Can trigger onFocus callback', () => {
    const spy = jest.fn()
    const wrapper = mount(<Choice onFocus={spy} />)
    const input = wrapper.find('input')

    input.simulate('focus')

    expect(spy).toHaveBeenCalled()
    wrapper.unmount()
  })

  test('Can trigger onChange callback', () => {
    const spy = jest.fn()
    const wrapper = mount(<Choice onChange={spy} value='Value' checked />)
    const input = wrapper.find('input')

    input.simulate('change')

    expect(spy).toHaveBeenCalledWith('Value')
    wrapper.unmount()
  })
})

describe('States', () => {
  test('Applies checkbox styles by default', () => {
    const wrapper = mount(<Choice />)
    const o = wrapper.find('.c-Choice')

    expect(o.prop('className')).toContain('is-checkbox')
    wrapper.unmount()
  })

  test('Applies checkbox styles if specified', () => {
    const wrapper = mount(<Choice type='checkbox' />)
    const o = wrapper.find('.c-Choice')
    const input = wrapper.find('input')

    expect(o.prop('className')).toContain('is-checkbox')
    expect(input.prop('type')).toBe('checkbox')
    wrapper.unmount()
  })

  test('Applies radio styles if specified', () => {
    const wrapper = mount(<Choice type='radio' />)
    const o = wrapper.find('.c-Choice')
    const input = wrapper.find('input')

    expect(o.prop('className')).toContain('is-radio')
    expect(input.prop('type')).toBe('radio')
    wrapper.unmount()
  })
})

describe('States', () => {
  test('Applies disabled styles if specified', () => {
    const wrapper = mount(<Choice label='Label' disabled />)
    const o = wrapper.find('.c-Choice')
    const input = wrapper.find('input')
    const labelText = wrapper.find(Text)

    expect(o.prop('className')).toContain('is-disabled')
    expect(labelText.prop('muted')).toBeTruthy()
    expect(input.prop('disabled')).toBeTruthy()
    wrapper.unmount()
  })

  test('Applies readOnly styles if specified', () => {
    const wrapper = mount(<Choice label='Label' readOnly />)
    const o = wrapper.find('.c-Choice')
    const input = wrapper.find('input')

    expect(o.prop('className')).toContain('is-readonly')
    expect(input.prop('readOnly')).toBeTruthy()
    wrapper.unmount()
  })

  test('Applies error styles if specified', () => {
    const state = 'error'
    const wrapper = mount(<Choice state={state} />)
    const o = wrapper.find('.c-Choice')
    const input = wrapper.find(ChoiceInput)

    expect(o.prop('className')).toContain(`is-${state}`)
    expect(input.prop('state')).toBe(state)
    wrapper.unmount()
  })

  test('Applies success styles if specified', () => {
    const state = 'success'
    const wrapper = mount(<Choice state={state} />)
    const o = wrapper.find('.c-Choice')
    const input = wrapper.find(ChoiceInput)

    expect(o.prop('className')).toContain(`is-${state}`)
    expect(input.prop('state')).toBe(state)
    wrapper.unmount()
  })

  test('Applies warning styles if specified', () => {
    const state = 'warning'
    const wrapper = mount(<Choice state={state} />)
    const o = wrapper.find('.c-Choice')
    const input = wrapper.find(ChoiceInput)

    expect(o.prop('className')).toContain(`is-${state}`)
    expect(input.prop('state')).toBe(state)
    wrapper.unmount()
  })
})

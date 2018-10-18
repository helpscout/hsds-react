import React from 'react'
import { mount } from 'enzyme'
import Choice from '../Choice'
import ChoiceInput from '../Input'
import Flexy from '../../Flexy'
import HelpText from '../../HelpText'
import Text from '../../Text'
import VisuallyHidden from '../../VisuallyHidden'

describe('ClassName', () => {
  test('Applies custom className if specified', () => {
    const customClass = 'piano-key-neck-tie'
    const wrapper = mount(<Choice className={customClass} />)

    expect(wrapper.prop('className')).toContain(customClass)
  })
})

describe('ID', () => {
  test('Has default componentID', () => {
    const wrapper = mount(<Choice />)

    expect(wrapper.state().id).toContain('Choice')
  })

  test('Can override default componentID', () => {
    const wrapper = mount(<Choice componentID="milk" />)

    expect(wrapper.state().id).toContain('milk')
    expect(wrapper.state().id).not.toContain('Choice')
  })
})

describe('Autofocus', () => {
  test('Does not autoFocus by default', () => {
    const wrapper = mount(<Choice />)
    const input = wrapper.find('input')

    expect(input.prop('autoFocus')).toBe(false)
    wrapper.unmount()
  })

  test('Does not autofocuses if checked', () => {
    const wrapper = mount(<Choice checked />)
    const input = wrapper.find('input')

    expect(input.prop('autoFocus')).toBe(false)
    wrapper.unmount()
  })
})

describe('Children', () => {
  test('Can render child component', () => {
    const wrapper = mount(
      <Choice checked>
        <div className="milk">Was a bad choice</div>
      </Choice>
    )
    const input = wrapper.find('input')
    const o = wrapper.find('.milk')

    expect(o.length).toBeTruthy()
    expect(o.text()).toContain('bad choice')
    wrapper.unmount()
  })

  test('Can render child component, instead of label', () => {
    const wrapper = mount(
      <Choice checked label="news-team-assemble">
        <div className="milk">Was a bad choice</div>
      </Choice>
    )
    const input = wrapper.find('input')
    const o = wrapper.find('.milk')

    expect(o.length).toBeTruthy()
    expect(o.text()).toContain('bad choice')
    expect(wrapper.html()).not.toContain('news-team')
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
    const wrapper = mount(<Choice label="Label" />)
    const text = wrapper.find(HelpText)

    expect(text.length).toBeFalsy()
    wrapper.unmount()
  })

  test('Renders helpText if specified', () => {
    const helpText = 'Help Text'
    const wrapper = mount(<Choice label="Label" helpText={helpText} />)
    const text = wrapper.find(HelpText)

    expect(text.length).toBeTruthy()
    expect(text.text()).toBe(helpText)
    wrapper.unmount()
  })
})

describe('Label', () => {
  test('Renders label if specified', () => {
    const wrapper = mount(<Choice label="Label" />)
    const labelText = wrapper.find('.c-Choice__label-text')
    const label = labelText.find(Text)

    expect(label.length).toBeTruthy()
    expect(label.text()).toBe('Label')
    wrapper.unmount()
  })

  test('Hide label if specified', () => {
    const wrapper = mount(<Choice hideLabel label="Label" />)
    const labelText = wrapper.find('.c-Choice__label-text')

    expect(labelText.find(Text).length).toBeFalsy()
    expect(labelText.find(VisuallyHidden).length).toBeTruthy()
  })
})

describe('Name', () => {
  test('Sets name on input if specified', () => {
    const wrapper = mount(<Choice name="Brick" />)
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
    const wrapper = mount(<Choice onChange={spy} value="Value" checked />)
    const input = wrapper.find('input')

    input.simulate('change')

    expect(spy).toHaveBeenCalledWith('Value', true)

    wrapper.setProps({ checked: false })
    input.simulate('change')

    expect(spy).toHaveBeenCalledWith('Value', false)
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
    const wrapper = mount(<Choice type="checkbox" />)
    const o = wrapper.find('.c-Choice')
    const input = wrapper.find('input')

    expect(o.prop('className')).toContain('is-checkbox')
    expect(input.prop('type')).toBe('checkbox')
    wrapper.unmount()
  })

  test('Applies radio styles if specified', () => {
    const wrapper = mount(<Choice type="radio" />)
    const o = wrapper.find('.c-Choice')
    const input = wrapper.find('input')

    expect(o.prop('className')).toContain('is-radio')
    expect(input.prop('type')).toBe('radio')
    wrapper.unmount()
  })
})

describe('States', () => {
  test('Applies disabled styles if specified', () => {
    const wrapper = mount(<Choice label="Label" disabled />)
    const o = wrapper.find('.c-Choice')
    const input = wrapper.find('input')
    const labelText = wrapper.find(Text)

    expect(o.prop('className')).toContain('is-disabled')
    expect(labelText.prop('muted')).toBeTruthy()
    expect(input.prop('disabled')).toBeTruthy()
    wrapper.unmount()
  })

  test('Applies readOnly styles if specified', () => {
    const wrapper = mount(<Choice label="Label" readOnly />)
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

describe('Stacked', () => {
  test('Does not wrap the label in a Flexy component', () => {
    const wrapper = mount(<Choice label="Label" stacked />)

    const flexy = wrapper.find(Flexy)
    expect(flexy.length).toBe(0)
  })
})

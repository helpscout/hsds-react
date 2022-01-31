import React from 'react'
import { mount } from 'enzyme'
import Choice from './Choice'
import ChoiceInput from './Choice.Input'
import ChoiceGroup from '../ChoiceGroup'
import HelpText from '../HelpText'
import Text from '../Text'
import VisuallyHidden from '../VisuallyHidden'

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

  test('Renders helpText outside label when not stacked', () => {
    const helpText = 'Help Text'
    const wrapper = mount(<Choice label="Label" helpText={helpText} />)
    const text = wrapper.find('label').find(HelpText)

    expect(text.length).toBeFalsy()
    wrapper.unmount()
  })

  test('Renders helpText inside label when stacked', () => {
    const helpText = 'Help Text'
    const wrapper = mount(<Choice label="Label" helpText={helpText} stacked />)
    const text = wrapper.find('label').find(HelpText)

    expect(text.length).toBeTruthy()
    expect(text.text()).toBe(helpText)
    wrapper.unmount()
  })

  test('Assigns ID to a helpText and use it on input as described by', () => {
    const helpText = 'Help Text'
    const wrapper = mount(
      <Choice label="Label" helpText={helpText} id="test-id" />
    )
    const text = wrapper.find('.c-HelpText').hostNodes()

    expect(text.prop('id')).toBe('test-id_description')
    expect(wrapper.find('input').prop('aria-describedby')).toBe(
      'test-id_description'
    )
    wrapper.unmount()
  })

  test('Does not set described by on input if no help text', () => {
    const wrapper = mount(<Choice label="Label" id="test-id" />)

    expect(wrapper.find('input').prop('aria-describedby')).not.toBeDefined()
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

  test('onEnter changes value and triggers callback', () => {
    const spy = jest.fn()
    const wrapper = mount(<Choice onEnter={spy} value="Value" checked />)
    const input = wrapper.find('input')

    input.simulate('keydown', { key: 'Enter' })

    expect(spy).toHaveBeenCalledWith('Value', false)

    wrapper.setProps({ checked: false })
    input.simulate('keydown', { key: 'Enter' })

    expect(spy).toHaveBeenCalledWith('Value', true)
    wrapper.unmount()
  })

  test('onEnter changes value and triggers callback using space', () => {
    const spy = jest.fn()
    const wrapper = mount(<Choice onEnter={spy} value="Value" checked />)
    const input = wrapper.find('input')

    input.simulate('keyup', { key: ' ' })

    expect(spy).toHaveBeenCalledWith('Value', false)

    wrapper.setProps({ checked: false })
    input.simulate('keyup', { key: ' ' })

    expect(spy).toHaveBeenCalledWith('Value', true)
    wrapper.unmount()
  })
})

describe('States', () => {
  test('Applies checkbox styles by default', () => {
    const wrapper = mount(<Choice />)
    const o = wrapper.find('div.c-Choice')

    expect(o.prop('className')).toContain('is-checkbox')
    wrapper.unmount()
  })

  test('Applies isBlock styles, if specified', () => {
    const wrapper = mount(<Choice isBlock={true} />)
    const o = wrapper.find('div.c-Choice')

    expect(o.prop('className')).toContain('is-block')
  })

  test('Does not render isBlock styles, by default', () => {
    const wrapper = mount(<Choice />)
    const o = wrapper.find('div.c-Choice')

    expect(o.prop('className')).not.toContain('is-block')
  })

  test('Applies checkbox styles if specified', () => {
    const wrapper = mount(<Choice type="checkbox" />)
    const o = wrapper.find('div.c-Choice')
    const input = wrapper.find('input')

    expect(o.prop('className')).toContain('is-checkbox')
    expect(input.prop('type')).toBe('checkbox')
    wrapper.unmount()
  })

  test('Applies radio styles if specified', () => {
    const wrapper = mount(<Choice type="radio" />)
    const o = wrapper.find('div.c-Choice')
    const input = wrapper.find('input')

    expect(o.prop('className')).toContain('is-radio')
    expect(input.prop('type')).toBe('radio')
    wrapper.unmount()
  })
})

describe('States', () => {
  test('Applies disabled styles if specified', () => {
    const wrapper = mount(<Choice label="Label" disabled />)
    const o = wrapper.find('div.c-Choice')
    const input = wrapper.find('input')
    const labelText = wrapper.find(Text)

    expect(o.prop('className')).toContain('is-disabled')
    expect(labelText.prop('muted')).toBeTruthy()
    expect(input.prop('disabled')).toBeTruthy()
    wrapper.unmount()
  })

  test('Applies readOnly styles if specified', () => {
    const wrapper = mount(<Choice label="Label" readOnly />)
    const o = wrapper.find('div.c-Choice')
    const input = wrapper.find('input')

    expect(o.prop('className')).toContain('is-readonly')
    expect(input.prop('readOnly')).toBeTruthy()
    wrapper.unmount()
  })

  test('Applies error styles if specified', () => {
    const state = 'error'
    const wrapper = mount(<Choice state={state} />)
    const o = wrapper.find('div.c-Choice')
    const input = wrapper.find(ChoiceInput)

    expect(o.prop('className')).toContain(`is-${state}`)
    expect(input.prop('state')).toBe(state)
    wrapper.unmount()
  })

  test('Applies success styles if specified', () => {
    const state = 'success'
    const wrapper = mount(<Choice state={state} />)
    const o = wrapper.find('div.c-Choice')
    const input = wrapper.find(ChoiceInput)

    expect(o.prop('className')).toContain(`is-${state}`)
    expect(input.prop('state')).toBe(state)
    wrapper.unmount()
  })

  test('Applies warning styles if specified', () => {
    const state = 'warning'
    const wrapper = mount(<Choice state={state} />)
    const o = wrapper.find('div.c-Choice')
    const input = wrapper.find(ChoiceInput)

    expect(o.prop('className')).toContain(`is-${state}`)
    expect(input.prop('state')).toBe(state)
    wrapper.unmount()
  })
})

describe('Stacked', () => {
  test('Renders components within a stacked wrapper', () => {
    const wrapper = mount(<Choice label="Label" stacked />)
    const el = wrapper.find('.c-Choice__stackedWrapper')

    expect(el.length).toBe(1)
  })
})

describe('ref', () => {
  test('Can retrieve ref DOM node', () => {
    const spy = jest.fn()
    const wrapper = mount(<Choice innerRef={spy} />)
    const o = wrapper.find('input').getDOMNode()

    expect(spy).toHaveBeenCalledWith(o)
  })
})

describe('ChoiceGroup.Context', () => {
  test('Inherits name from context', () => {
    const wrapper = mount(
      <ChoiceGroup name="buddy">
        <Choice name="elf" />
      </ChoiceGroup>
    )
    const el = wrapper.find('input')

    expect(el.prop('name')).toBe('buddy')
  })

  test('Can fire onBlur from ChoiceGroup and Choice', () => {
    const groupSpy = jest.fn()
    const spy = jest.fn()

    const wrapper = mount(
      <ChoiceGroup name="buddy" onBlur={groupSpy}>
        <Choice name="elf" onBlur={spy} />
      </ChoiceGroup>
    )
    const el = wrapper.find('input')

    el.simulate('blur')

    expect(groupSpy).toHaveBeenCalled()
    expect(spy).toHaveBeenCalled()
  })

  test('Can fire onFocus from ChoiceGroup and Choice', () => {
    const groupSpy = jest.fn()
    const spy = jest.fn()

    const wrapper = mount(
      <ChoiceGroup name="buddy" onFocus={groupSpy}>
        <Choice name="elf" onFocus={spy} />
      </ChoiceGroup>
    )
    const el = wrapper.find('input')

    el.simulate('focus')

    expect(groupSpy).toHaveBeenCalled()
    expect(spy).toHaveBeenCalled()
  })

  test('Can fire onChange from ChoiceGroup and Choice', () => {
    const groupSpy = jest.fn()
    const spy = jest.fn()

    const wrapper = mount(
      <ChoiceGroup name="buddy" onChange={groupSpy}>
        <Choice name="elf" onChange={spy} />
      </ChoiceGroup>
    )
    const el = wrapper.find('input')

    el.simulate('change')

    expect(groupSpy).toHaveBeenCalled()
    expect(spy).toHaveBeenCalled()
  })

  test('Inherits checked from ChoiceGroup', () => {
    const wrapper = mount(
      <ChoiceGroup name="buddy" value="elf">
        <Choice value="elf" />
      </ChoiceGroup>
    )
    let el = wrapper.find('input')

    expect(el.prop('checked')).toBe(true)

    wrapper.setProps({
      value: 'nope',
    })

    el = wrapper.find('input')

    expect(el.prop('checked')).toBe(false)
  })
})

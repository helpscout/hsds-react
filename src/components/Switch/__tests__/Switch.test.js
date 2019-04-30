import React from 'react'
import { mount } from 'enzyme'
import Switch from '../Switch'
import FormLabel from '../../FormLabel'
import { SwitchUI, BackdropUI, ToggleUI } from '../styles/Switch.css'

describe('ClassName', () => {
  test('Has default className', () => {
    const wrapper = mount(<Switch />)
    const el = wrapper.find('.c-Switch')

    expect(el.length).toBeTruthy()
  })

  test('Accepts custom className', () => {
    const className = 'milk-was-a-bad-choice'
    const wrapper = mount(<Switch className={className} />)
    const el = wrapper
      .find('.c-Switch')
      .first()
      .getDOMNode()

    expect(el.classList.contains(className)).toBe(true)
  })
})

describe('Input', () => {
  test('Renders a styled input', () => {
    const wrapper = mount(<Switch />)
    const o = wrapper.instance().getInputMarkup()

    expect(o).toBeTruthy()
  })
})

describe('Accessibility', () => {
  test('Has proper aria roles', () => {
    const wrapper = mount(<Switch />)
    const o = wrapper.find('input').props()

    expect(o['aria-checked'] !== undefined).toBeTruthy()
    expect(o['role']).toBe('switch')
  })

  test('Has proper ID', () => {
    const wrapper = mount(<Switch />)
    const o = wrapper.find('input').props()

    expect(o.id).toBe(wrapper.find('label').props().htmlFor)
  })
})

describe('Checked', () => {
  test('Is false by default', () => {
    const wrapper = mount(<Switch />)
    const o = wrapper.instance()

    expect(o.props.checked).toBeFalsy()
    expect(o.state.checked).toBeFalsy()
    expect(wrapper.hasClass('is-checked')).not.toBeTruthy()
  })

  test('Can be set to true', () => {
    const wrapper = mount(<Switch checked />)
    const o = wrapper.instance()

    expect(o.state.checked).toBeTruthy()
    expect(wrapper.find('input').props()['aria-checked']).toBeTruthy()
    expect(wrapper.find('input').props().checked).toBeTruthy()
  })

  test('Can be toggled by changing input', () => {
    const wrapper = mount(<Switch />)
    const input = wrapper.find('input')
    const o = wrapper.instance()

    input.simulate('change')

    expect(o.state.checked).toBeTruthy()
    expect(wrapper.find('input').props().checked).toBeTruthy()
  })

  test('Can be manually set using checked prop', () => {
    const wrapper = mount(<Switch checked />)
    const o = wrapper.instance()

    wrapper.setProps({ checked: false })

    expect(o.state.checked).toBe(false)
    expect(wrapper.find('input').props().checked).toBe(false)

    wrapper.setProps({ checked: true })

    expect(o.state.checked).toBe(true)
    expect(wrapper.find('input').props().checked).toBe(true)
  })
})

describe('Disabled', () => {
  test('Is false by default', () => {
    const wrapper = mount(<Switch />)
    const o = wrapper.instance()

    const backdrop = wrapper.find(BackdropUI)

    expect(o.props.disabled).toBeFalsy()
    expect(backdrop.hasClass('is-disabled')).not.toBeTruthy()
  })

  test('Can be set to true', () => {
    const wrapper = mount(<Switch disabled />)
    const o = wrapper.instance()

    const backdrop = wrapper.find(BackdropUI)

    expect(o.props.disabled).toBeTruthy()
    expect(backdrop.hasClass('is-disabled')).toBeTruthy()
  })
})

describe('Loading', () => {
  test('Is not loading by default', () => {
    const wrapper = mount(<Switch />)

    expect(wrapper.prop('isLoading')).toBe(false)
  })

  test('Does not render checked/active styles if onLoading', () => {
    const wrapper = mount(<Switch checked isLoading />)
    wrapper.setState({ isActive: true })

    const comp = wrapper.find(SwitchUI)
    const backdrop = wrapper.find(BackdropUI)
    const toggle = wrapper.find(ToggleUI)

    expect(comp.hasClass('is-checked')).toBe(false)
    expect(backdrop.hasClass('is-checked')).toBe(false)
    expect(toggle.hasClass('is-checked')).toBe(false)
    expect(toggle.hasClass('is-active')).toBe(false)
  })

  test('Can render checked/active styles if not onLoading', () => {
    const wrapper = mount(<Switch checked isLoading={false} />)
    wrapper.setState({ isActive: true })

    const comp = wrapper.find(SwitchUI)
    const backdrop = wrapper.find(BackdropUI)
    const toggle = wrapper.find(ToggleUI)

    expect(comp.hasClass('is-checked')).toBe(true)
    expect(backdrop.hasClass('is-checked')).toBe(true)
    expect(toggle.hasClass('is-checked')).toBe(true)
    expect(toggle.hasClass('is-active')).toBe(true)
  })

  test('onClick callback does not fire if isLoading', () => {
    const spy = jest.fn()
    const eventSpy = jest.fn()
    const wrapper = mount(<Switch onClick={spy} isLoading />)
    const input = wrapper.find('input')

    input.simulate('click', { preventDefault: eventSpy })
    expect(spy).not.toHaveBeenCalled()
    expect(eventSpy).toHaveBeenCalledTimes(1)
  })
})

describe('Toggle', () => {
  test('Toggles active styles on mousedown/mouseup', () => {
    const wrapper = mount(<Switch />)
    const comp = wrapper.find(SwitchUI)
    let toggle = wrapper.find(ToggleUI)

    expect(toggle.hasClass('is-active')).toBe(false)

    comp.simulate('mousedown')

    toggle = wrapper.find(ToggleUI)
    expect(toggle.hasClass('is-active')).toBe(true)

    comp.simulate('mouseup')

    toggle = wrapper.find(ToggleUI)
    expect(toggle.hasClass('is-active')).toBe(false)
  })
})

describe('Events', () => {
  test('onBlur callback can be triggered', () => {
    const spy = jest.fn()
    const wrapper = mount(<Switch onBlur={spy} />)
    const input = wrapper.find('input')

    input.simulate('blur')

    expect(spy).toHaveBeenCalled()
  })

  test('onChange callback can be triggered', () => {
    const spy = jest.fn()
    const wrapper = mount(<Switch onChange={spy} value="Mugatu" />)
    const input = wrapper.find('input')

    input.simulate('change')

    expect(spy).toHaveBeenCalled()
  })

  test('onChange callback also receives value and event', () => {
    let callbackProps = []
    const onChange = (...args) => (callbackProps = [...args])
    const wrapper = mount(
      <Switch onChange={onChange} value="Mugatu" checked={false} />
    )
    const input = wrapper.find('input')

    input.simulate('change')

    expect(callbackProps[0]).toBe(true)
    expect(callbackProps[1].event).toBeTruthy()
    expect(callbackProps[1].value).toBe('Mugatu')
  })

  test('onClick callback can be triggered, by onChange', () => {
    const spy = jest.fn()
    const wrapper = mount(<Switch onClick={spy} value="Mugatu" />)
    const input = wrapper.find('input')

    input.simulate('click')

    expect(spy).toHaveBeenCalled()
    expect(spy).toHaveBeenCalledTimes(1)
  })

  test('onFocus callback can be triggered', () => {
    const spy = jest.fn()
    const wrapper = mount(<Switch onFocus={spy} />)
    const input = wrapper.find('input')

    input.simulate('focus')

    expect(spy).toHaveBeenCalled()
  })

  test('onMouseDown callback can be triggered', () => {
    const spy = jest.fn()
    const wrapper = mount(<Switch onMouseDown={spy} />)

    wrapper.find(SwitchUI).simulate('mousedown')

    expect(spy).toHaveBeenCalled()
  })

  test('onMouseUp callback can be triggered', () => {
    const spy = jest.fn()
    const wrapper = mount(<Switch onMouseUp={spy} />)

    wrapper.find(SwitchUI).simulate('mouseup')

    expect(spy).toHaveBeenCalled()
  })
})

describe('ID', () => {
  test('Automatically renders a unique ID', () => {
    const wrapper = mount(<Switch />)
    const wrapper2 = mount(<Switch />)
    const o = wrapper.find('input')

    expect(o.props().id).toBeTruthy()
    expect(o.props().id).not.toBe(wrapper2.find('input').props().id)
  })

  test('Can accept custom ID', () => {
    const wrapper = mount(<Switch id="Mugatu" />)
    const o = wrapper.find('input')

    expect(o.props().id).toBe('Mugatu')
  })

  test('FormLabel can generate an ID', () => {
    const wrapper = mount(
      <FormLabel>
        <Switch />
      </FormLabel>
    )
    const o = wrapper.find('input')

    expect(o.prop('id')).toContain('FormControl')
  })

  test('FormLabel ID is preferred over prop ID', () => {
    const wrapper = mount(
      <FormLabel>
        <Switch id="Buddy" />
      </FormLabel>
    )
    const o = wrapper.find('input')

    expect(o.prop('id')).not.toContain('Buddy')
  })

  test('Fallsback to auto-generated ID of no context ID is provided', () => {
    const wrapper = mount(<Switch />)
    const o = wrapper.instance()

    expect(o.getIdFromContextProps()).toContain('Switch')
  })

  test('Passes ID correctly to label and input', () => {
    const wrapper = mount(
      <FormLabel id="Buddy">
        <Switch />
      </FormLabel>
    )
    const label = wrapper.find('label').first()
    const o = wrapper.find('input').first()

    expect(label.props().htmlFor).toBe('Buddy')
    expect(label.props().id).not.toBe('Buddy')
    expect(o.props().id).toBe('Buddy')
  })
})

describe('State', () => {
  test('onChange callback receives next switch state ', () => {
    let callbackProps = []
    const onChange = (...args) => (callbackProps = [...args])
    const wrapper = mount(
      <Switch onChange={onChange} checked={false} value="Mugatu" />
    )
    const input = wrapper.find('input')

    input.simulate('change')

    expect(callbackProps[0]).toBe(true)
  })

  test('Can render error styles', () => {
    const wrapper = mount(<Switch state="error" />)
    const el = wrapper
      .find('.c-Switch')
      .first()
      .getDOMNode()

    expect(el.classList.contains('is-error')).toBe(true)
  })
})

describe('Styles', () => {
  test('Can render size styles, if applicable', () => {
    const wrapper = mount(<Switch size="sm" />)
    const el = wrapper
      .find('.c-Switch')
      .first()
      .getDOMNode()

    expect(el.classList.contains('is-sm')).toBe(true)
  })
})

describe('innerRef', () => {
  test('Can retrieve innerRef DOM node', () => {
    const spy = jest.fn()
    const wrapper = mount(<Switch innerRef={spy} />)
    const o = wrapper.find('input').getDOMNode()

    expect(spy).toHaveBeenCalledWith(o)
  })
})

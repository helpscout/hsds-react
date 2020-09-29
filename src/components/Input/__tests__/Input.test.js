import React from 'react'
import { render as renderComponent } from '@testing-library/react'
import user from '@testing-library/user-event'
import { mount, shallow, render } from 'enzyme'
import Input from '../Input'
import Resizer from '../Input.Resizer'
import Badge from '../../Badge'
import Animate from '../../Animate'
import { CharValidatorUI } from '../Input.css'

const ui = {
  field: '.c-InputField',
  errorIcon: '.c-Input__errorIcon',
  helpText: '.c-Input__helpText',
  hintText: '.c-Input__hintText',
  input: 'div.c-Input',
  label: '.c-Input__label',
  suffix: 'div.c-Input__item.is-suffix',
  tooltip: '.c-Tooltip',
}

jest.useFakeTimers()

describe('ClassName', () => {
  test('Has default className', () => {
    const wrapper = mount(<Input />)
    const input = wrapper.find(ui.input)
    const field = wrapper.find(ui.field)
    const backdrop = wrapper.find('.c-Input__backdrop')

    expect(input.exists()).toBeTruthy()
    expect(field.exists()).toBeTruthy()
    expect(backdrop.exists()).toBeTruthy()
  })

  test('Accepts custom className', () => {
    const className = 'milk-was-a-bad-choice'
    const wrapper = mount(<Input className={className} />)
    const o = wrapper.find(`.${className}`)

    expect(o.exists()).toBeTruthy()
  })
})

describe('Input', () => {
  test('Can generate an input component', () => {
    const wrapper = render(<Input />)
    const el = wrapper.find('input')

    expect(el.length).toBeTruthy()
  })
})

describe('Autofocus', () => {
  test('Does not autoFocus by default', () => {
    const wrapper = mount(<Input />)
    const input = wrapper.find('input')

    expect(input.prop('autoFocus')).toBeFalsy()
  })

  test('Autofocuses if specified', () => {
    jest.useFakeTimers()
    const wrapper = mount(<Input autoFocus />)

    jest.runAllTimers()
    expect(wrapper.state('isFocused')).toBeTruthy()
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

    input.getDOMNode().value = value
    input.simulate('change')

    expect(spy).toHaveBeenCalledWith(value)
  })

  test('onWheel callback does not trigger for non-multiline inputs', () => {
    const spy = jest.fn()
    const wrapper = mount(<Input onWheel={spy} multiline={false} />)
    const input = wrapper.find('input')

    input.simulate('wheel')

    expect(spy).not.toHaveBeenCalled()
  })

  test('onWheel callback only triggers for multiline + scrollLock enabled inputs', () => {
    const spy = jest.fn()
    const wrapper = mount(<Input onWheel={spy} multiline={true} scrollLock />)
    const input = wrapper.find('textarea')

    input.simulate('wheel')

    expect(spy).toHaveBeenCalled()
  })

  test('onWheel callback stops event from bubbling', () => {
    const spy = jest.fn()
    const wrapper = mount(<Input multiline={true} scrollLock />)
    const input = wrapper.find('textarea')

    input.simulate('wheel', {
      stopPropagation: spy,
    })

    expect(spy).toHaveBeenCalled()
  })

  test('onWheel callback stops event from bubbling, even without scrollLock', () => {
    const spy = jest.fn()
    const wrapper = mount(<Input multiline={3} scrollLock={false} />)
    const input = wrapper.find('textarea')

    input.simulate('wheel', {
      stopPropagation: spy,
    })

    expect(spy).toHaveBeenCalled()
  })

  test('onKeydown callback fires when input keyDown occurs', () => {
    const spy = jest.fn()
    const wrapper = mount(<Input multiline={true} onKeyDown={spy} />)

    wrapper.instance().computedStyles = {
      paddingBottom: 10,
    }

    const input = wrapper.find('textarea')

    input.simulate('keydown')
    expect(spy).toHaveBeenCalled()
  })

  test('onResize callback is called when Input resizes', () => {
    const spy = jest.fn()
    const wrapper = mount(<Input multiline={true} onResize={spy} />)
    const resizer = wrapper.find('InputResizer')

    resizer.instance().handleOnResize()

    expect(spy).toHaveBeenCalled()
  })
})

describe('insertCarriageReturnsAtCursorIndex', () => {
  let onChangeSpy,
    preventDefaultSpy,
    setSelectionRangeSpy,
    stopPropagationSpy,
    wrapper

  beforeEach(() => {
    onChangeSpy = jest.fn()
    setSelectionRangeSpy = jest.fn()
    preventDefaultSpy = jest.fn()
    stopPropagationSpy = jest.fn()
    wrapper = shallow(
      <Input hasInsertCarriageReturns={true} onChange={onChangeSpy} />
    )
    wrapper
      .instance()
      .setInputNodeRef({ setSelectionRange: setSelectionRangeSpy })
    wrapper.instance().setState = jest.fn((newState, callback) => callback())
  })

  test('if empty value with cursorIndex at 0, should only call preventDefault', () => {
    wrapper.instance().insertCarriageReturnAtCursorIndex({
      shiftKey: true,
      preventDefault: preventDefaultSpy,
      stopPropagation: stopPropagationSpy,
      currentTarget: {
        selectionStart: 0,
        value: '',
      },
    })
    expect(preventDefaultSpy).toHaveBeenCalledTimes(1)
    expect(stopPropagationSpy).toHaveBeenCalledTimes(0)
    expect(wrapper.instance().setState).toHaveBeenCalledTimes(0)
    expect(onChangeSpy).toHaveBeenCalledTimes(0)
    expect(setSelectionRangeSpy).toHaveBeenCalledTimes(0)
  })

  test('expect state to get set and update the value', () => {
    wrapper.instance().insertCarriageReturnAtCursorIndex({
      ctrlKey: true,
      preventDefault: preventDefaultSpy,
      stopPropagation: stopPropagationSpy,
      currentTarget: {
        selectionStart: 4,
        value: 'testtest',
      },
    })
    expect(preventDefaultSpy).toHaveBeenCalledTimes(1)
    expect(stopPropagationSpy).toHaveBeenCalledTimes(1)
    expect(wrapper.instance().setState).toHaveBeenCalledTimes(1)
    expect(wrapper.instance().setState.mock.calls[0][0]).toEqual({
      value: 'test\ntest',
    })
    expect(onChangeSpy).toHaveBeenCalledTimes(1)
    expect(setSelectionRangeSpy).toHaveBeenCalledTimes(1)
  })

  test('call insertCarriageReturnAtCursorIndex if hasInsertCarriageReturns is true', () => {
    const insertCarriageReturnAtCursorIndexSpy = jest.spyOn(
      Input.prototype,
      'insertCarriageReturnAtCursorIndex'
    )
    const wrapper = mount(<Input hasInsertCarriageReturns={true} />)
    const el = wrapper.find('input')
    el.simulate('keydown', { keyCode: 13 })

    expect(insertCarriageReturnAtCursorIndexSpy).toHaveBeenCalled()
  })
})

describe('value', () => {
  test('Does not update the state if new value is the same as previous value', () => {
    const lifecycleSpy = jest.spyOn(
      Input.prototype,
      'UNSAFE_componentWillReceiveProps'
    )
    const stateSpy = jest.spyOn(Input.prototype, 'setState')

    const wrapper = mount(<Input value="initial value" />)
    expect(wrapper.find('input').prop('value')).toBe('initial value')

    wrapper.setProps({ value: 'initial value' })
    expect(lifecycleSpy).toHaveBeenCalled()
    expect(stateSpy).not.toHaveBeenCalled()
    expect(wrapper.find('input').prop('value')).toBe('initial value')
  })

  test('Does update the state if new value is different than previous value', () => {
    const lifecycleSpy = jest.spyOn(
      Input.prototype,
      'UNSAFE_componentWillReceiveProps'
    )
    const stateSpy = jest.spyOn(Input.prototype, 'setState')

    const wrapper = mount(<Input value="initial value" />)
    expect(wrapper.find('input').prop('value')).toBe('initial value')

    wrapper.setProps({ value: 'new value' })
    expect(lifecycleSpy).toHaveBeenCalled()
    expect(stateSpy).toHaveBeenCalledWith({ value: 'new value' })
    expect(wrapper.find('input').prop('value')).toBe('new value')
  })
})

describe('ID', () => {
  test('Automatically generates an ID if not defined', () => {
    const wrapper = mount(<Input label="Input" />)
    const label = wrapper.find('label')
    const input = wrapper.find('input')
    const id = input.prop('id')

    expect(id).toBeTruthy()
    expect(id).toContain('Input')
    expect(label.prop('htmlFor')).toBe(id)
  })

  test('Can set custom ID on Input', () => {
    const wrapper = mount(
      <Input label="Input" id="sixty-percent-of-the-time" />
    )
    const label = wrapper.find('label')
    const input = wrapper.find('input')
    const id = input.prop('id')

    expect(id).toBeTruthy()
    expect(id).toContain('sixty-percent-of-the-time')
    expect(label.prop('htmlFor')).toBe(id)
  })
})

describe('Multiline', () => {
  test('Default selector is an input', () => {
    const wrapper = render(<Input />)
    const el = wrapper.find('input')

    expect(el.length).toBeTruthy()
  })

  test('Selector becomes a textarea if multiline is defined', () => {
    const wrapper = render(<Input multiline />)
    const el = wrapper.find('textarea')

    expect(el.length).toBeTruthy()
  })

  test('Accepts number argument', () => {
    const wrapper = render(<Input multiline={5} />)
    const el = wrapper.find('textarea')

    expect(el.length).toBeTruthy()
  })

  test('Adds Resizer component if multiline is defined', () => {
    const wrapper = mount(<Input multiline />)

    expect(wrapper.find(Resizer).exists()).toBeTruthy()
  })

  test('Applies resizable styles if specified', () => {
    const wrapper = render(<Input multiline resizable />)
    const el = wrapper.find('textarea')

    expect(el.hasClass('is-resizable')).toBeTruthy()
  })

  test('Has regular height without multiline', () => {
    const wrapper = mount(<Input />)
    const el = wrapper.find('input')

    expect(el.prop('style')).toBeFalsy()
  })

  test('Sets height on textarea with multiline', () => {
    const wrapper = mount(<Input multiline={3} />)
    // This is very difficult (basically impossible) to test with Enzyme/JSDOM.
    // This method involves height calculation, which is absent from JSDOM's api.
    // JSDOM always returns 0 for height.

    // The only thing we can check is if the height is not null (because null is default)
    // The height should be 0, which is what JSDOM returns.

    expect(wrapper.state()).not.toBe(null)
  })

  test('Has a maxHeight by default', () => {
    const wrapper = mount(<Input multiline={3} />)
    const el = wrapper.find('textarea')

    expect(el.prop('style').maxHeight).toBeTruthy()
  })

  test('Sets maxHeight on multiline, if specified', () => {
    const wrapper = mount(<Input multiline={3} maxHeight={50} />)
    const el = wrapper.find('textarea')

    expect(el.prop('style').maxHeight).toBe(50)
  })

  test('Adds maxHeight styles, if specified', () => {
    const wrapper = mount(<Input multiline={3} maxHeight={50} />)
    const el = wrapper.find('textarea')

    expect(el.getDOMNode().classList.contains('has-maxHeight')).toBeTruthy()
  })

  test('maxHeight Accepts string values', () => {
    const wrapper = mount(<Input multiline={3} maxHeight="50vh" />)
    const el = wrapper.find('textarea')

    expect(el.prop('style').maxHeight).toBe('50vh')
  })

  test('Does not focus input on resize', () => {
    const spy = jest.fn()
    const wrapper = mount(<Input multiline={3} maxHeight="50vh" />)
    const el = wrapper.find('textarea')
    el.getDOMNode().onfocus = spy

    wrapper.instance().handleExpandingResize()

    expect(spy).not.toHaveBeenCalled()
  })
})

describe('HelpText', () => {
  test('Does not render by default', () => {
    const wrapper = mount(<Input />)
    const o = wrapper.find(ui.helpText)
    expect(o.length).not.toBeTruthy()
  })

  test('Adds helpText if specified', () => {
    const wrapper = mount(<Input helpText="Help text" />)
    const o = wrapper.find(ui.helpText).first()
    expect(o.exists()).toBeTruthy()
    expect(o.text()).toBe('Help text')
  })

  test('Accepts React components', () => {
    const custom = <div className="custom">Custom text</div>
    const wrapper = mount(<Input helpText={custom} />)
    const o = wrapper.find(ui.helpText)
    const c = o.find('.custom')

    expect(o.exists()).toBeTruthy()
    expect(c.exists()).toBeTruthy()
    expect(c.text()).toBe('Custom text')
  })
})

describe('HintText', () => {
  test('Does not render by default', () => {
    const wrapper = mount(<Input />)
    const o = wrapper.find(ui.hintText)
    expect(o.length).not.toBeTruthy()
  })

  test('Adds hintText if specified', () => {
    const wrapper = mount(<Input hintText="Hint text" />)
    const o = wrapper.find(ui.hintText).first()
    expect(o.exists()).toBeTruthy()
    expect(o.text()).toBe('Hint text')
  })

  test('Accepts React components', () => {
    const custom = <div className="custom">Custom text</div>
    const wrapper = mount(<Input hintText={custom} />)
    const o = wrapper.find(ui.hintText).first()
    const c = o.find('.custom')

    expect(o.exists()).toBeTruthy()
    expect(c.exists()).toBeTruthy()
    expect(c.text()).toBe('Custom text')
  })
})

describe('Label', () => {
  test('Adds label if specified', () => {
    const wrapper = mount(<Input label="Channel" />)
    const label = wrapper.find(ui.label).first()

    expect(label.exists()).toBeTruthy()
    expect(label.text()).toBe('Channel')
  })

  test('Accepts React components', () => {
    const custom = <div className="custom">Custom text</div>
    const wrapper = mount(<Input label={custom} />)
    const o = wrapper.find(ui.label).first()
    const c = o.find('.custom')

    expect(o.exists()).toBeTruthy()
    expect(c.exists()).toBeTruthy()
    expect(c.text()).toBe('Custom text')
  })
})

describe('Styles', () => {
  test('Applies seamless styles if specified', () => {
    const wrapper = mount(<Input seamless />)
    const o = wrapper.find(ui.input)

    expect(o.prop('className')).toContain('is-seamless')
  })

  test('Applies sizing styles if specified', () => {
    const wrapper = mount(<Input size="sm" />)
    const o = wrapper.find('input')

    expect(o.hasClass('is-sm')).toBeTruthy()
  })

  test('Passes style prop to wrapper', () => {
    const wrapper = mount(<Input size="sm" style={{ background: 'red' }} />)

    expect(wrapper.prop('style').background).toBe('red')
  })
})

describe('States', () => {
  test('Applies disabled styles if specified', () => {
    const wrapper = mount(<Input disabled />)
    const o = wrapper.find(ui.input)
    const input = wrapper.find('input')

    expect(o.prop('className')).toContain('is-disabled')
    expect(input.prop('disabled')).toBeTruthy()
  })

  test('Applies readOnly styles if specified', () => {
    const wrapper = mount(<Input readOnly />)
    const o = wrapper.find(ui.input)
    const input = wrapper.find('input')

    expect(o.prop('className')).toContain('is-readonly')
    expect(input.prop('readOnly')).toBeTruthy()
  })

  test('Applies error styles if specified', () => {
    const wrapper = mount(<Input state="error" />)
    const o = wrapper.find(ui.input)

    expect(o.prop('className')).toContain('is-error')
  })

  test('Applies success styles if specified', () => {
    const wrapper = mount(<Input state="success" />)
    const o = wrapper.find(ui.input)

    expect(o.prop('className')).toContain('is-success')
  })

  test('Applies warning styles if specified', () => {
    const wrapper = mount(<Input state="warning" />)
    const o = wrapper.find(ui.input)

    expect(o.prop('className')).toContain('is-warning')
  })

  test('Updates state.state on prop change', () => {
    const wrapper = mount(<Input state="warning" />)
    const input = wrapper.find(ui.input)

    wrapper.setProps({ state: 'success' })

    expect(wrapper.state().state).toBe('success')
    expect(input.getDOMNode().classList.contains('is-success')).toBe(true)

    wrapper.setProps({ state: null })

    expect(wrapper.state().state).toBe(null)
    expect(input.getDOMNode().classList.contains('is-success')).toBe(false)
  })
})

describe('Stateful helper label', () => {
  test('Renders stateful helper label if error is a string', () => {
    const wrapper = mount(<Input state="error" helpText="Error" />)
    const helperLabel = wrapper.find('.c-HelpText').first()

    expect(helperLabel.exists()).toBeTruthy()
    expect(helperLabel.text()).toBe('Error')
  })
})

describe('removeStateStylesOnFocus', () => {
  test('Does not remove state style on focus, by default', () => {
    const wrapper = mount(<Input state="error" />)
    const input = wrapper.find(ui.input)
    const o = wrapper.find('input')

    o.simulate('focus')

    expect(wrapper.state().state).toBe('error')
    expect(input.getDOMNode().classList.contains('is-error')).toBe(true)
  })

  test('Removes state style on focus, by specified', () => {
    const wrapper = mount(<Input state="error" removeStateStylesOnFocus />)
    const input = wrapper.find(ui.input)
    const o = wrapper.find('input')

    o.simulate('focus')

    expect(wrapper.state().state).toBeFalsy()
    expect(input.getDOMNode().classList.contains('is-error')).toBe(false)
  })
})

describe('inputNode', () => {
  test('Sets inputNode on mount', () => {
    const wrapper = mount(<Input />)

    expect(wrapper.instance().inputNode).toBeTruthy()
  })

  test('Unsets inputNode on unmount', () => {
    const wrapper = mount(<Input />)
    const o = wrapper.instance()
    wrapper.unmount()

    expect(o.inputNode).not.toBeTruthy()
  })
})

describe('isFocused', () => {
  test('Can focus input using isFocused prop', () => {
    const wrapper = mount(<Input isFocused />)
    const o = wrapper.instance().inputNode
    const spy = jest.spyOn(o, 'focus')

    jest.runAllTimers()

    expect(spy).toHaveBeenCalled()
    expect(wrapper.state('isFocused')).toBeTruthy()
    expect(wrapper.find('is-focused')).toBeTruthy()
  })

  test('Can focus input using custom timeout', () => {
    const wrapper = mount(<Input isFocused forceAutoFocusTimeout={20} />)
    const o = wrapper.instance().inputNode
    const spy = jest.spyOn(o, 'focus')

    jest.runAllTimers()

    expect(spy).toHaveBeenCalled()
    expect(wrapper.state('isFocused')).toBeTruthy()
    expect(wrapper.find('is-focused')).toBeTruthy()
  })

  test('Can toggle isFocused', () => {
    const spy = jest.fn()
    const wrapper = mount(
      <Input onFocus={spy} isFocused={false} forceAutoFocusTimeout={20} />
    )
    const o = wrapper.instance().inputNode
    o.onfocus = spy

    wrapper.setProps({ isFocused: true })

    jest.runAllTimers()

    expect(spy).toHaveBeenCalled()
  })
})

describe('moveCursorToEnd', () => {
  test('Moves the selection cursor to end of value', () => {
    const wrapper = mount(<Input value="WEE" moveCursorToEnd />)
    wrapper.setState({ value: 'WEE' })
    wrapper.instance().moveCursorToEnd()
  })
})

describe('Typing events', () => {
  let refs, spies, wrapper

  beforeEach(() => {
    jest.useFakeTimers()
    refs = {
      applySubmit: () => {},
    }

    spies = {
      callStartTyping: jest.spyOn(Input.prototype, 'callStartTyping'),
      callStopTyping: jest.spyOn(Input.prototype, 'callStopTyping'),
      clearThrottler: jest.spyOn(Input.prototype, 'clearThrottler'),
      clearTypingTimeout: jest.spyOn(Input.prototype, 'clearTypingTimeout'),
      onStartTyping: jest.fn(),
      onStopTyping: jest.fn(),
      setThrottler: jest.spyOn(Input.prototype, 'setThrottler'),
      setTypingTimeout: jest.spyOn(Input.prototype, 'setTypingTimeout'),
      typingEvent: jest.spyOn(Input.prototype, 'typingEvent'),
    }

    wrapper = mount(
      <Input
        onStartTyping={spies.onStartTyping}
        onStopTyping={spies.onStopTyping}
        refApplyCallStopTyping={fn => (refs.applySubmit = fn)}
        typingTimeoutDelay={3000}
        withTypingEvent={true}
      />
    )
  })

  afterEach(() => {
    jest.clearAllMocks()
    jest.clearAllTimers()
  })

  afterAll(() => {
    jest.useRealTimers()
  })

  test(`On start typing should call start typing events and make a timeout`, () => {
    wrapper.find('input').simulate('change')
    expect(spies.clearTypingTimeout).toHaveBeenCalledTimes(1)
    expect(spies.typingEvent).toHaveBeenCalledTimes(1)
    expect(spies.callStartTyping).toHaveBeenCalledTimes(1)
    expect(spies.setTypingTimeout).toHaveBeenCalledTimes(1)
    expect(spies.onStartTyping).toHaveBeenCalledTimes(1)
    expect(setTimeout.mock.calls[1][1]).toEqual(3000)
  })

  test('After a delay of 3000ms and no more typing events, should call stop typing events and clear timeout', () => {
    expect(wrapper.props().typingTimeoutDelay).toBe(3000)
    wrapper.find('input').simulate('change')
    expect(wrapper.state().typingTimeout).toBeDefined()
    expect(wrapper.state().typingThrottle).toBeDefined()
    expect(spies.callStartTyping).toHaveBeenCalledTimes(1)
    wrapper.find('input').simulate('change')
    expect(spies.callStartTyping).toHaveBeenCalledTimes(1)
    jest.runTimersToTime(5000)
    expect(wrapper.state.typingTimeout).not.toBeDefined()
    expect(spies.callStopTyping).toHaveBeenCalledTimes(1)
    expect(spies.onStopTyping).toHaveBeenCalledTimes(1)
    expect(spies.clearTypingTimeout).toHaveBeenCalledTimes(3)
    expect(clearTimeout).toHaveBeenCalledTimes(2)
    expect(clearInterval).toHaveBeenCalledTimes(1)
  })

  test('If the delay is less than 3000ms reset the timeout than fire it if time advances past 3000ms', () => {
    wrapper.find('input').simulate('change')
    expect(spies.callStartTyping).toHaveBeenCalledTimes(1)
    jest.runTimersToTime(2100)
    expect(spies.onStartTyping).toHaveBeenCalledTimes(5)
    wrapper.find('input').simulate('change')
    expect(spies.callStartTyping).toHaveBeenCalledTimes(1)
    expect(spies.setThrottler).toHaveBeenCalledTimes(1)
    expect(spies.callStopTyping).not.toHaveBeenCalled()
    expect(spies.onStopTyping).not.toHaveBeenCalled()
    expect(spies.clearTypingTimeout).toHaveBeenCalledTimes(2)
    // only going to clear timeout if there is one
    expect(clearTimeout).toHaveBeenCalledTimes(1)
    wrapper.find('input').simulate('change')
    expect(spies.clearTypingTimeout).toHaveBeenCalledTimes(3)
    expect(clearTimeout).toHaveBeenCalledTimes(2)
    jest.runTimersToTime(4999)
    expect(spies.onStartTyping).toHaveBeenCalledTimes(11)
    expect(spies.callStopTyping).toHaveBeenCalledTimes(1)
    expect(spies.onStopTyping).toHaveBeenCalledTimes(1)
    expect(spies.clearTypingTimeout).toHaveBeenCalledTimes(4)
    expect(clearTimeout).toHaveBeenCalledTimes(3)
    expect(spies.callStartTyping).toHaveBeenCalledTimes(1)
    expect(spies.setThrottler).toHaveBeenCalledTimes(1)
  })

  test('Should clear timeout on componentWillUnMount', () => {
    wrapper.find('input').simulate('change')
    wrapper.unmount()
    expect(spies.clearTypingTimeout).toHaveBeenCalledTimes(2)
  })

  test('Should call callStopTyping on refApplyCallStopTyping', () => {
    wrapper.find('input').simulate('change')
    expect(spies.callStartTyping).toHaveBeenCalledTimes(1)
    expect(spies.clearTypingTimeout).toHaveBeenCalledTimes(1)
    refs.applySubmit()
    expect(spies.onStopTyping).toHaveBeenCalledTimes(1)
    expect(spies.clearTypingTimeout).toHaveBeenCalledTimes(2)
  })
})

describe('Unmount', () => {
  it('should call clearTimeout once when the component unmounts', () => {
    const clearTimeout = jest.spyOn(window, 'clearTimeout')
    const wrapper = mount(<Input />)
    wrapper.find('input').simulate('change')
    const id = wrapper.instance().autoFocusTimeoutId
    wrapper.unmount()
    expect(clearTimeout).toHaveBeenCalledWith(id)
  })
})

describe('ErrorMessage', () => {
  test('Does not render an error Icon if suffix is defined', () => {
    const wrapper = mount(<Input suffix="Derek" />)
    const el = wrapper.find(ui.errorIcon)

    expect(el.length).toBe(0)
  })

  test('Can render an error Icon and suffix', () => {
    const wrapper = mount(<Input suffix="Derek" state="error" />)
    const error = wrapper.find(ui.errorIcon).first()
    const suffix = wrapper.find(ui.suffix).first()

    expect(error.length).toBe(1)
    expect(error.props().tabIndex).toBe(0)
    expect(suffix.length).toBe(1)
  })

  test('Renders a Tooltip, if error', () => {
    const wrapper = mount(
      <Input suffix="Derek" state="error" errorMessage="Nope!" />
    )
    const el = wrapper.find('Tooltip').first()

    expect(el.length).toBe(1)
    expect(el.props().title).toBe('Nope!')
  })

  test('Can customize error Icon', () => {
    const wrapper = mount(
      <Input suffix="Derek" state="error" errorIcon="chat" tabIndex={3} />
    )
    const el = wrapper.find('Icon')

    expect(el.props().name).toBe('chat')
    expect(el.props().tabIndex).toBe(3)
  })
})

describe('inlinePrefix/inlineSuffix', () => {
  test('Can render an inline prefix', () => {
    const wrapper = mount(<Input inlinePrefix="Words" />)
    const el = wrapper.find('div.c-Input__item.is-prefix')

    expect(el.text()).toBe('Words')
  })

  test('Can render an inline suffix', () => {
    const wrapper = mount(<Input inlineSuffix="Words" />)
    const el = wrapper.find('div.c-Input__item.is-suffix')

    expect(el.text()).toBe('Words')
  })

  test('Can render both inline prefix and suffix', () => {
    const wrapper = mount(<Input inlinePrefix="A lota" inlineSuffix="Words" />)
    const prefix = wrapper.find('div.c-Input__item.is-prefix')
    const suffix = wrapper.find('div.c-Input__item.is-suffix')

    expect(prefix.text()).toBe('A lota')
    expect(suffix.text()).toBe('Words')
  })
})

describe('Prefix', () => {
  test('Does not render a Prefix by default', () => {
    const wrapper = mount(<Input />)
    const o = wrapper.find(Input.Prefix)

    expect(o.length).toBe(0)
  })

  test('Renders a prefix if specified', () => {
    const Compo = () => <div className="Compo">Hello</div>
    const wrapper = mount(<Input prefix={<Compo />} />)
    const pre = wrapper.find(Input.Prefix)
    const o = pre.find('div.Compo')

    expect(pre.length).toBe(1)
    expect(o.length).toBe(1)
  })
})

describe('Suffix', () => {
  test('Does not render a Suffix by default', () => {
    const wrapper = mount(<Input />)
    const o = wrapper.find(Input.Suffix)

    expect(o.length).toBe(0)
  })

  test('Renders a Suffix if specified', () => {
    const Compo = () => <div className="Compo">Hello</div>
    const wrapper = mount(<Input suffix={<Compo />} />)
    const suf = wrapper.find(Input.Suffix)
    const o = suf.find('div.Compo')

    expect(suf.length).toBe(1)
    expect(o.length).toBe(1)
  })

  test('Can render a Prefix and a Suffix', () => {
    const Compo = () => <div className="Compo">Hello</div>
    const wrapper = mount(<Input prefix={<Compo />} suffix={<Compo />} />)
    const pre = wrapper.find(Input.Prefix)
    const o = pre.find('div.Compo')
    const suf = wrapper.find(Input.Suffix)
    const p = suf.find('div.Compo')

    expect(pre.length).toBe(1)
    expect(o.length).toBe(1)
    expect(suf.length).toBe(1)
    expect(p.length).toBe(1)
  })
})

describe('ref', () => {
  test('Can retrieve ref DOM node', () => {
    const spy = jest.fn()
    const wrapper = mount(<Input innerRef={spy} />)
    const o = wrapper.find('input').getDOMNode()

    expect(spy).toHaveBeenCalledWith(o)
  })
})

describe('computedStyles', () => {
  test('Does not set computed styles if height is falsey', () => {
    const wrapper = mount(<Input multiline />)
    const o = wrapper.instance()

    o.setComputedStylesFromHeight(0)

    expect(o.computedStyles).toBeFalsy()
  })

  test('Does not set computed styles if inputNode is falsey', () => {
    const wrapper = mount(<Input multiline />)
    const o = wrapper.instance()

    o.inputNode = undefined
    o.setComputedStylesFromHeight(50)

    expect(o.computedStyles).toBeFalsy()
  })

  test('Sets computed styles from input note', () => {
    const wrapper = mount(<Input multiline />)
    const o = wrapper.instance()
    o.inputNode.style.paddingBottom = '100px'

    o.setComputedStylesFromHeight(50)

    expect(o.computedStyles.paddingBottom).toBe(100)
  })

  test('Does not set computedStyles again after caching', () => {
    const wrapper = mount(<Input multiline />)
    const o = wrapper.instance()

    o.inputNode.style.paddingBottom = '100px'
    o.setComputedStylesFromHeight(150)

    o.inputNode.style.paddingBottom = '500px'
    o.setComputedStylesFromHeight(550)

    expect(o.computedStyles.paddingBottom).toBe(100)
  })
})

describe('Action', () => {
  test('Can render action UI', () => {
    const wrapper = mount(
      <Input action={<button className="action">Go</button>} />
    )
    const el = wrapper.find('button.action')

    expect(el.length).toBeTruthy()
  })

  test('Can render multiple action UI', () => {
    const wrapper = mount(
      <Input
        action={
          <div>
            <button className="go">Go</button>
            <button className="cancel">Go</button>
          </div>
        }
      />
    )

    expect(wrapper.find('button.go').length).toBeTruthy()
    expect(wrapper.find('button.cancel').length).toBeTruthy()
  })
})

describe('onEnterDown', () => {
  test('Fires onEnterDown when key enter is pressed (down)', () => {
    const spy = jest.fn()
    const wrapper = mount(<Input onEnterDown={spy} />)
    const el = wrapper.find('input')

    el.simulate('keydown', {
      keyCode: 13,
    })

    expect(spy).toHaveBeenCalled()
  })

  test('Fires onEnterDown when key enter + shift is pressed (down)', () => {
    const spy = jest.fn()
    const wrapper = mount(<Input onEnterDown={spy} />)
    const el = wrapper.find('input')

    el.simulate('keydown', {
      keyCode: 13,
      shiftKey: true,
    })

    expect(spy).toHaveBeenCalled()
  })

  test('Fires onEnterDown when key enter + shift is pressed (down)', () => {
    const spy = jest.fn()
    const wrapper = mount(<Input onEnterDown={spy} />)
    const el = wrapper.find('input')

    el.simulate('keydown', {
      keyCode: 13,
      ctrlKey: true,
    })

    expect(spy).toHaveBeenCalled()
  })

  test('onKeyDown still fires when Enter key is pressed', () => {
    const enterSpy = jest.fn()
    const keyDownSpy = jest.fn()
    const wrapper = mount(
      <Input onEnterDown={enterSpy} onKeyDown={keyDownSpy} />
    )
    const el = wrapper.find('input')

    el.simulate('keydown', {
      keyCode: 13,
    })

    expect(enterSpy).toHaveBeenCalled()
    expect(keyDownSpy).toHaveBeenCalled()
  })

  test('onEnterDown does not fire when a non-Enter key is pressed (down)', () => {
    const enterSpy = jest.fn()
    const keyDownSpy = jest.fn()
    const wrapper = mount(
      <Input onEnterDown={enterSpy} onKeyDown={keyDownSpy} />
    )
    const el = wrapper.find('input')

    el.simulate('keydown', {
      keyCode: 40,
    })

    expect(enterSpy).not.toHaveBeenCalled()
    expect(keyDownSpy).toHaveBeenCalled()
  })
})

describe('onEnterUp', () => {
  test('Fires onEnterUp when key enter is pressed (up)', () => {
    const spy = jest.fn()
    const wrapper = mount(<Input onEnterUp={spy} />)
    const el = wrapper.find('input')

    el.simulate('keyup', {
      keyCode: 13,
    })

    expect(spy).toHaveBeenCalled()
  })

  test('Fires onEnterUp when key enter + shift is pressed (up)', () => {
    const spy = jest.fn()
    const wrapper = mount(<Input onEnterUp={spy} />)
    const el = wrapper.find('input')

    el.simulate('keyup', {
      keyCode: 13,
      shiftKey: true,
    })

    expect(spy).toHaveBeenCalled()
  })

  test('Fires onEnterUp when key enter + shift is pressed (up)', () => {
    const spy = jest.fn()
    const wrapper = mount(<Input onEnterUp={spy} />)
    const el = wrapper.find('input')

    el.simulate('keyup', {
      keyCode: 13,
      ctrlKey: true,
    })

    expect(spy).toHaveBeenCalled()
  })

  test('onKeyUp still fires when Enter key is pressed', () => {
    const enterSpy = jest.fn()
    const keyUpSpy = jest.fn()
    const wrapper = mount(<Input onEnterUp={enterSpy} onKeyUp={keyUpSpy} />)
    const el = wrapper.find('input')

    el.simulate('keyup', {
      keyCode: 13,
    })

    expect(enterSpy).toHaveBeenCalled()
    expect(keyUpSpy).toHaveBeenCalled()
  })

  test('onEnterUp does not fire when a non-Enter key is pressed (up)', () => {
    const enterSpy = jest.fn()
    const keyUpSpy = jest.fn()
    const wrapper = mount(<Input onEnterUp={enterSpy} onKeyUp={keyUpSpy} />)
    const el = wrapper.find('input')

    el.simulate('keyup', {
      keyCode: 40,
    })

    expect(enterSpy).not.toHaveBeenCalled()
    expect(keyUpSpy).toHaveBeenCalled()
  })
})

describe('inputType', () => {
  test('Removes characters for number inputType', () => {
    const spy = jest.fn()
    const { container } = renderComponent(
      <Input inputType="number" onChange={spy} />
    )
    const input = container.querySelector('input')

    user.type(input, 'abc123def ~!@#$%^&*()-=[]')

    expect(input.value).toBe('123')
    expect(spy).toHaveBeenCalledWith('123')
  })
})

describe('charValidator', () => {
  test('it should set the proper char validator count', () => {
    const wrapper = mount(
      <Input charValidatorLimit="9" withCharValidator={true} />
    )
    wrapper.instance().setValue('12345')
    expect(wrapper.state().validatorCount).toEqual(4)
  })

  test('it should set a validator count only if the count is more than the value', () => {
    const wrapper = mount(
      <Input charValidatorLimit="20" withCharValidator={true} />
    )
    wrapper.instance().setValue('1234567891011')
    expect(wrapper.state().validatorCount).toEqual(7)
    wrapper.instance().setValue('12345')
    expect(wrapper.state().validatorCount).toEqual(7)
  })

  test('it should render charValidator without a badge', () => {
    const wrapper = mount(
      <Input isFocused={true} value="1" withCharValidator={true} />
    )
    expect(wrapper.find(Badge).length).toEqual(0)
    expect(wrapper.find(CharValidatorUI).length).toEqual(1)
    const animate = wrapper.find(Animate)
    expect(animate.props().in).toEqual(false)
    expect(animate.length).toEqual(1)
  })
  test('it should render charValidator with a badge', () => {
    const wrapper = mount(
      <Input
        charValidatorLimit="10"
        isFocused={true}
        withCharValidator={true}
        value="123456"
      />
    )
    expect(wrapper.find(Badge).length).toEqual(1)
    expect(wrapper.find(CharValidatorUI).length).toEqual(1)
    const animate = wrapper.find(Animate)
    expect(animate.props().in).toEqual(true)
    expect(animate.length).toEqual(1)
  })
  test('it should not render charValidator', () => {
    const wrapper = mount(<Input />)
    expect(wrapper.find(CharValidatorUI).length).toEqual(0)
  })
  test('it should not render badge if the input does not have focus', () => {
    const wrapper = mount(
      <Input
        charValidatorLimit={10}
        isFocused={false}
        value="12345678"
        withCharValidator={true}
      />
    )
    expect(wrapper.find(CharValidatorUI).length).toEqual(1)
    expect(wrapper.find(Badge).length).toEqual(0)
  })
  test('it should not render charValidator, because showAt has not been reached', () => {
    const wrapper = mount(<Input withCharValidator={true} value="12345678" />)
    expect(wrapper.find(CharValidatorUI).length).toEqual(1)
    const animate = wrapper.find(Animate)
    const badge = wrapper.find(Badge)
    expect(animate.props().in).toEqual(false)
    expect(animate.length).toEqual(1)
    expect(badge.length).toEqual(0)
  })

  test('it should render with badge error', () => {
    const wrapper = mount(
      <Input
        charValidatorLimit={7}
        isFocused={true}
        value="12345678"
        withCharValidator={true}
      />
    )
    const animate = wrapper.find(Animate)
    const badge = wrapper.find(Badge)
    expect(wrapper.find(CharValidatorUI).length).toEqual(1)
    expect(animate.props().in).toEqual(true)
    expect(animate.length).toEqual(1)
    expect(badge.length).toEqual(1)
    expect(badge.props().status).toEqual('error')
  })

  test('it should render with badge warning', () => {
    const wrapper = mount(
      <Input
        charValidatorLimit={21}
        isFocused={true}
        withCharValidator={true}
        value="only a fifth left"
      />
    )
    const animate = wrapper.find(Animate)
    const badge = wrapper.find(Badge)
    expect(wrapper.find(CharValidatorUI).length).toEqual(1)
    expect(animate.props().in).toEqual(true)
    expect(animate.length).toEqual(1)
    expect(badge.length).toEqual(1)
    expect(badge.props().status).toEqual('warning')
  })
  test('it should render charValidator success', () => {
    const wrapper = mount(
      <Input
        charValidatorLimit={10}
        isFocused={true}
        value="123456"
        withCharValidator={true}
      />
    )
    const animate = wrapper.find(Animate)
    const badge = wrapper.find(Badge)
    expect(wrapper.find(CharValidatorUI).length).toEqual(1)
    expect(animate.props().in).toEqual(true)
    expect(animate.length).toEqual(1)
    expect(badge.length).toEqual(1)
    expect(badge.props().status).toEqual('success')
  })
})

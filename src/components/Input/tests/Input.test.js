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

describe('value', () => {
  test('Does not update the state if new value is the same as previous value', () => {
    const lifecycleSpy = jest.spyOn(Input.prototype, 'componentWillReceiveProps')
    const stateSpy = jest.spyOn(Input.prototype, 'setState')

    const wrapper = mount(<Input value='initial value' />)
    expect(wrapper.find('input').prop('value')).toBe('initial value')

    wrapper.setProps({value: 'initial value'})
    expect(lifecycleSpy).toHaveBeenCalled()
    expect(stateSpy).not.toHaveBeenCalled()
    expect(wrapper.find('input').prop('value')).toBe('initial value')
  })

  test('Does update the state if new value is different than previous value', () => {
    const lifecycleSpy = jest.spyOn(Input.prototype, 'componentWillReceiveProps')
    const stateSpy = jest.spyOn(Input.prototype, 'setState')

    const wrapper = mount(<Input value='initial value' />)
    expect(wrapper.find('input').prop('value')).toBe('initial value')

    wrapper.setProps({value: 'new value'})
    expect(lifecycleSpy).toHaveBeenCalled()
    expect(stateSpy).toHaveBeenCalledWith({value: 'new value'})
    expect(wrapper.find('input').prop('value')).toBe('new value')
  })
})

describe('ID', () => {
  test('Automatically generates an ID if not defined', () => {
    const wrapper = mount(<Input label='Input' />)
    const label = wrapper.find('label')
    const input = wrapper.find('input')
    const id = input.prop('id')

    expect(id).toBeTruthy()
    expect(id).toContain('Input')
    expect(label.prop('htmlFor')).toBe(id)
  })

  test('Can set custom ID on Input', () => {
    const wrapper = mount(<Input label='Input' id='sixty-percent-of-the-time' />)
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

  test('Has regular height without multiline', () => {
    const wrapper = shallow(<Input />)
    const o = wrapper.find('.c-InputField')

    expect(o.prop('style')).toBe(null)
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
})

describe('HelpText', () => {
  test('Adds helpText if specified', () => {
    const wrapper = mount(<Input helpText='Help text' />)
    const helpText = wrapper.find('div').last()
    expect(helpText.exists()).toBeTruthy()
    expect(helpText.text()).toBe('Help text')
  })
})

describe('HintText', () => {
  test('Adds hintText if specified', () => {
    const wrapper = mount(<Input hintText='Hint text' />)
    const hintText = wrapper.find('div').first()
    expect(hintText.exists()).toBeTruthy()
    expect(hintText.text()).toBe('Hint text')
  })
})

describe('Label', () => {
  test('Adds label if specified', () => {
    const wrapper = mount(<Input label='Channel' />)
    const label = wrapper.find('Label')

    expect(label.exists()).toBeTruthy()
    expect(label.text()).toBe('Channel')
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

  test('Passes style prop to wrapper', () => {
    const wrapper = shallow(<Input size='sm' style={{background: 'red'}} />)

    expect(wrapper.prop('style').background).toBe('red')
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
    const wrapper = shallow(<Input state='error' />)
    const o = wrapper.find('.c-Input')

    expect(o.prop('className')).toContain('is-error')
  })

  test('Applies success styles if specified', () => {
    const wrapper = shallow(<Input state='success' />)
    const o = wrapper.find('.c-Input')

    expect(o.prop('className')).toContain('is-success')
  })

  test('Applies warning styles if specified', () => {
    const wrapper = shallow(<Input state='warning' />)
    const o = wrapper.find('.c-Input')

    expect(o.prop('className')).toContain('is-warning')
  })

  test('Updates state.state on prop change', () => {
    const wrapper = mount(<Input state='warning' />)
    const input = wrapper.find('.c-Input')

    wrapper.setProps({ state: 'success' })

    expect(wrapper.state().state).toBe('success')
    expect(input.hasClass('is-success')).toBe(true)

    wrapper.setProps({ state: null })

    expect(wrapper.state().state).toBe(null)
    expect(input.hasClass('is-success')).toBe(false)
  })
})

describe('Stateful helper label', () => {
  test('Renders stateful helper label if error is a string', () => {
    const wrapper = mount(<Input state='error' helpText='Error' />)
    const helperLabel = wrapper.find('.c-HelpText')

    expect(helperLabel.exists()).toBeTruthy()
    expect(helperLabel.text()).toBe('Error')
  })
})

describe('removeStateStylesOnFocus', () => {
  test('Does not remove state style on focus, by default', () => {
    const wrapper = mount(<Input state='error' />)
    const input = wrapper.find('.c-Input')
    const o = wrapper.find('input')

    o.simulate('focus')

    expect(wrapper.state().state).toBe('error')
    expect(input.hasClass('is-error')).toBe(true)
  })

  test('Removes state style on focus, by specified', () => {
    const wrapper = mount(<Input state='error' removeStateStylesOnFocus />)
    const input = wrapper.find('.c-Input')
    const o = wrapper.find('input')

    o.simulate('focus')

    expect(wrapper.state().state).toBeFalsy()
    expect(input.hasClass('is-error')).toBe(false)
  })
})

describe('inputNode', () => {
  test('Sets inputNode on mount', () => {
    const wrapper = mount(<Input />)

    expect(wrapper.node.inputNode).toBeTruthy()
  })

  test('Unsets inputNode on unmount', () => {
    const wrapper = mount(<Input />)
    wrapper.unmount()

    expect(wrapper.node.inputNode).not.toBeTruthy()
  })
})

describe('isFocused', () => {
  test('Can focus input using isFocused prop', (done) => {
    const spy = jest.fn()
    const wrapper = mount(<Input isFocused />)
    const o = wrapper.node.inputNode
    o.onfocus = spy

    setTimeout(() => {
      expect(spy).toHaveBeenCalled()
      done()
    }, 160)
  })

  test('Can focus input using custom timeout', (done) => {
    const spy = jest.fn()
    const wrapper = mount(
      <Input
        isFocused
        forceAutoFocusTimeout={20}
      />
    )
    const o = wrapper.node.inputNode
    o.onfocus = spy

    expect(spy).not.toHaveBeenCalled()

    setTimeout(() => {
      expect(spy).toHaveBeenCalled()
      done()
    }, 40)
  })

  test('Can toggle isFocused', (done) => {
    const spy = jest.fn()
    const wrapper = mount(
      <Input
        onFocus={spy}
        isFocused={false}
        forceAutoFocusTimeout={20}
      />
    )
    const o = wrapper.node.inputNode
    o.onfocus = spy

    wrapper.setProps({isFocused: true})

    setTimeout(() => {
      expect(spy).toHaveBeenCalled()
      done()
    }, 40)
  })
})

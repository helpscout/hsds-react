import React from 'react'
import { mount } from 'enzyme'
import { EditableTextarea } from './EditableTextarea'
import {
  INPUT_CLASSNAMES,
  STATES_CLASSNAMES,
} from '../EditableField/EditableField.utils'

const flushPromises = () => new Promise(setImmediate)

jest.useFakeTimers()

describe('className', () => {
  test('Has default className', () => {
    const wrapper = mount(<EditableTextarea />)

    expect(wrapper.find('.c-EditableTextarea')).toBeTruthy()
  })

  test('Can render custom className', () => {
    const customClass = 'piano-key-neck-tie'
    const wrapper = mount(<EditableTextarea className={customClass} />)
    const el = wrapper.find(`.${customClass}`)

    expect(el.length).toBeTruthy()
  })
})

describe('HTML props', () => {
  test('Can render default HTML props', () => {
    const wrapper = mount(<EditableTextarea data-cy="BlueBlueBlue" />)
    const el = wrapper.find('[data-cy="BlueBlueBlue"]')

    expect(el.length).toBeTruthy()
  })
})

describe('Label', () => {
  test('Renders label', () => {
    const wrapper = mount(<EditableTextarea />)

    expect(wrapper.find('.EditableTextarea__label').length).toBeTruthy()
  })

  test('The label has the correct "for" attribute based of name', () => {
    const wrapper = mount(<EditableTextarea id="company" />)
    const el = wrapper.find('.EditableTextarea__label').first().getDOMNode()
    const forAttr = el.getAttribute('for')

    expect(forAttr).toContain('company')
  })
})

describe('ref', () => {
  test('Can retrieve ref DOM node', () => {
    const spy = jest.fn()
    const wrapper = mount(<EditableTextarea id="company" innerRef={spy} />)
    const o = wrapper.find('.c-EditableTextarea').first().getDOMNode()

    expect(spy).toHaveBeenCalledWith(o)
  })
})

describe('Value', () => {
  test('Value should be empty string if no value passed', () => {
    const wrapper = mount(<EditableTextarea id="company" />)
    const textarea = wrapper.find('textarea')

    expect(textarea.getDOMNode().value).toBe('')
  })

  test('Value should be empty string if no value passed, placeholder should be present if passed', () => {
    const wrapper = mount(
      <EditableTextarea id="company" placeholder="Add something" />
    )
    const textarea = wrapper.find('textarea').first().getDOMNode()

    expect(textarea.getAttribute('placeholder')).toBe('Add something')
  })

  test('Should assign a given value if passed on props', () => {
    const wrapper = mount(
      <EditableTextarea
        id="company"
        placeholder="Add something"
        value="Some Notes"
      />
    )
    const textarea = wrapper.find('textarea').first().getDOMNode()

    expect(textarea.value).toBe('Some Notes')
  })

  test('Should change a given value if passed on props', () => {
    const wrapper = mount(
      <EditableTextarea
        id="company"
        placeholder="Add something"
        value="hello"
      />
    )
    const textarea = wrapper.find('textarea').first().getDOMNode()

    expect(textarea.value).toBe('hello')

    wrapper.setProps({ value: 'hola' })

    expect(textarea.value).toBe('hola')
  })

  test('Should not change value if value passed on props is the same as initial prop', () => {
    const wrapper = mount(
      <EditableTextarea
        id="company"
        placeholder="Add something"
        value="hello"
      />
    )

    const textarea = wrapper.find('textarea').first().getDOMNode()

    expect(textarea.value).toBe('hello')

    wrapper.setProps({ value: 'hello' })

    expect(textarea.value).toBe('hello')
  })

  test('Should not change value if value passed on props is the same as state', () => {
    const wrapper = mount(
      <EditableTextarea
        id="company"
        placeholder="Add something"
        value="hello"
      />
    )

    expect(
      wrapper
        .find('textarea')
        .first()

        .getDOMNode().value
    ).toBe('hello')

    wrapper.setState({ value: 'hello' })
    wrapper.setProps({ value: 'hello' })

    expect(
      wrapper
        .find('textarea')
        .first()

        .getDOMNode().value
    ).toBe('hello')
  })
})

describe('Keydown', () => {
  test('Enter', () => {
    const onEnterSpy = jest.fn()
    const wrapper = mount(
      <EditableTextarea id="company" value="hello" onEnter={onEnterSpy} />
    )

    wrapper.find('textarea').first().simulate('keydown', { key: 'Enter' })

    expect(onEnterSpy).toHaveBeenCalled()
  })

  test('Escape', () => {
    const onEscapeSpy = jest.fn()
    const wrapper = mount(
      <EditableTextarea id="company" value="hello" onEscape={onEscapeSpy} />
    )

    wrapper.find('textarea').first().simulate('keydown', { key: 'Escape' })

    expect(onEscapeSpy).toHaveBeenCalled()
  })

  test('onChange', () => {
    const spy = jest.fn()
    const wrapper = mount(<EditableTextarea id="company" onChange={spy} />)
    const textarea = wrapper.find('textarea').first()

    textarea.simulate('change', { target: { value: 'a' } })

    expect(spy).toHaveBeenCalled()
  })

  test('onInputKeyDown', () => {
    const onInputKeyDownSpy = jest.fn()
    const wrapper = mount(
      <EditableTextarea
        id="company"
        value="hello"
        onInputKeyDown={onInputKeyDownSpy}
      />
    )
    wrapper.find('textarea').first().simulate('keydown', { key: 'Tab' })
    expect(onInputKeyDownSpy).toHaveBeenCalled()
    const arg = onInputKeyDownSpy.mock.calls[0][0]
    expect(arg.name).toEqual('company')
    expect(arg.value).toHaveLength(1)
    expect(arg.value[0].id).toEqual('company')
    expect(arg.value[0].value).toEqual('hello')
  })
})

describe('Keyup', () => {
  test('Escape', done => {
    const wrapper = mount(<EditableTextarea id="company" value="hello" />)

    expect(wrapper.state('readOnly')).toEqual(true)

    const ta = wrapper.find('textarea').first()
    ta.simulate('click')

    expect(wrapper.state('readOnly')).toEqual(false)

    ta.simulate('keyup', { key: 'a' })

    jest.runAllTimers()

    let f = flushPromises()

    f.then(() => {
      expect(wrapper.state('readOnly')).toEqual(false)
      ta.simulate('keyup', { key: 'Escape' })
      jest.runAllTimers()
      f = flushPromises()
      f.then(() => {
        expect(wrapper.state('readOnly')).toEqual(false)
        done()
      }).catch(done)
    })
  })

  test('onInputKeyUp', () => {
    const onInputKeyUpSpy = jest.fn()
    const wrapper = mount(
      <EditableTextarea
        id="company"
        value="hello"
        onInputKeyUp={onInputKeyUpSpy}
      />
    )
    wrapper.find('textarea').first().simulate('keyup', { key: 'Tab' })
    expect(onInputKeyUpSpy).toHaveBeenCalled()
    const arg = onInputKeyUpSpy.mock.calls[0][0]
    expect(arg.name).toEqual('company')
    expect(arg.value).toHaveLength(1)
    expect(arg.value[0].id).toEqual('company')
    expect(arg.value[0].value).toEqual('hello')
  })
})

describe('Blur', () => {
  test('should commit if value changes', done => {
    const onCommitSpy = jest.fn()

    const wrapper = mount(
      <EditableTextarea id="company" value="hello" onCommit={onCommitSpy} />
    )

    const textarea = wrapper.find('textarea').first()

    textarea.simulate('change', { target: { value: 'hola' } })
    textarea.simulate('blur')

    const f = flushPromises()
    jest.runAllTimers()

    f.then(() => {
      expect(onCommitSpy).toHaveBeenCalled()
      done()
    }).catch(done)
  })

  test('should not commit if value unchanged', done => {
    const onCommitSpy = jest.fn()
    const wrapper = mount(
      <EditableTextarea id="company" value="hello" onCommit={onCommitSpy} />
    )
    const textarea = wrapper.find('textarea').first()

    textarea.simulate('change', { target: { value: 'hello' } })
    textarea.simulate('blur')

    const f = flushPromises()
    jest.runAllTimers()

    f.then(() => {
      expect(onCommitSpy).not.toHaveBeenCalled()
      done()
    }).catch(done)
  })

  test('Pressing Enter: should commit if value changes', done => {
    const onEnterSpy = jest.fn()
    const onCommitSpy = jest.fn()
    const wrapper = mount(
      <EditableTextarea
        id="company"
        value="1234567"
        onEnter={onEnterSpy}
        onCommit={onCommitSpy}
      />
    )

    const textarea = wrapper.find('textarea').first()

    textarea.simulate('change', { target: { value: '123' } })
    textarea.simulate('keydown', { key: 'Enter' })

    jest.runAllTimers()

    flushPromises().then(() => {
      wrapper.update()

      expect(onEnterSpy).toHaveBeenCalled()
      expect(onCommitSpy).toHaveBeenCalled()
      done()
    })
  })

  test('Pressing Enter: should not commit if value invalid', done => {
    const onEnterSpy = jest.fn()
    const onCommitSpy = jest.fn()
    const wrapper = mount(
      <EditableTextarea
        id="company"
        value="1234567"
        onEnter={onEnterSpy}
        onCommit={onCommitSpy}
        validate={({ name, value }) =>
          Promise.resolve({
            isValid: false,
            name,
            value,
            type: 'error',
            message: 'That is definitely not right',
          })
        }
      />
    )

    const textarea = wrapper.find('textarea').first()

    textarea.getDOMNode().value = '8888'
    textarea.simulate('keydown', { key: 'Enter' })

    const f = flushPromises()
    jest.runAllTimers()

    f.then(() => {
      expect(onEnterSpy).toHaveBeenCalled()
      expect(onCommitSpy).not.toHaveBeenCalled()
      done()
    }).catch(done)
  })

  test('should not run validate fn if value already validated', done => {
    const validateSpy = jest.fn(() => Promise.resolve({ isValid: true }))
    const wrapper = mount(
      <EditableTextarea id="company" value="hello" validate={validateSpy} />
    )

    wrapper.setState({ validated: true })

    const f = flushPromises()
    jest.runAllTimers()

    f.then(() => {
      expect(validateSpy).not.toHaveBeenCalled()
      done()
    }).catch(done)
  })
})

describe('Readonly', () => {
  test('should start as readonly', () => {
    const wrapper = mount(<EditableTextarea id="company" />)

    expect(wrapper.state('readOnly')).toBeTruthy()
  })

  test('should toggle readonly', () => {
    const wrapper = mount(<EditableTextarea id="company" />)

    wrapper.find('textarea').simulate('click')
    expect(wrapper.state('readOnly')).toBeFalsy()

    wrapper.find('textarea').simulate('blur')
    expect(wrapper.state('readOnly')).toBeTruthy()
  })
})

describe('validation rendering', () => {
  test('should not render validation on mount', () => {
    const wrapper = mount(<EditableTextarea id="greeting" value="hello" />)

    expect(wrapper.find(`.${INPUT_CLASSNAMES.validation}`).length).toBeFalsy()
  })

  test('should render validation if invalid', done => {
    const wrapper = mount(
      <EditableTextarea
        id="greeting_0"
        value="hello"
        validate={({ name, value }) =>
          Promise.resolve({
            isValid: false,
            name,
            value,
            type: 'error',
            message: 'That is definitely not right',
          })
        }
      />
    )

    const textarea = wrapper.find('textarea').first()

    textarea.simulate('change', { target: { value: '123' } })
    textarea.simulate('blur')

    const f = flushPromises()
    jest.runAllTimers()

    f.then(() => {
      wrapper.update()
      expect(
        wrapper.find('.c-EditableTextarea__validation').length
      ).toBeTruthy()
      done()
    }).catch(done)
  })

  test('should not render validation if valid', done => {
    const wrapper = mount(
      <EditableTextarea
        id="greeting_0"
        value="hello"
        validate={({ name, value }) =>
          Promise.resolve({
            isValid: true,
            name,
            value,
            type: 'other',
            message: '',
          })
        }
      />
    )

    const textarea = wrapper.find('textarea').first()

    textarea.simulate('change', { target: { value: '123' } })
    textarea.simulate('blur')

    const f = flushPromises()

    jest.runAllTimers()

    f.then(() => {
      wrapper.update()
      expect(wrapper.find('.c-EditableTextarea__validation').length).toBeFalsy()
      done()
    }).catch(done)
  })

  test('should not render validation if id mistmatches', done => {
    const wrapper = mount(
      <EditableTextarea
        id="greeting_0"
        value="hello"
        validate={({ name, value }) =>
          Promise.resolve({
            isValid: true,
            name: 'something else',
            value,
            type: 'other',
            message: '',
          })
        }
      />
    )

    const textarea = wrapper.find('textarea').first()

    textarea.simulate('change', { target: { value: 'hello' } })
    textarea.simulate('blur')

    const f = flushPromises()
    jest.runAllTimers()

    f.then(() => {
      wrapper.update()
      expect(wrapper.find('.c-EditableTextarea__validation').length).toBeFalsy()
      done()
    }).catch(done)
  })
})

describe('floating labels', () => {
  test('Adds the floating labels className', () => {
    const wrapper = mount(<EditableTextarea id="company" floatingLabels />)

    expect(
      wrapper.find(`.${STATES_CLASSNAMES.withFloatingLabels}`).length
    ).toBeTruthy()
  })

  test('Label is hidden when floating labels on', () => {
    const wrapper = mount(<EditableTextarea id="company" floatingLabels />)

    expect(wrapper.find('.EditableTextarea__label').length).toBeFalsy()
  })
})

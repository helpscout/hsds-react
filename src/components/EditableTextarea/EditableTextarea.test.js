import React from 'react'
import { cy } from '@helpscout/cyan'
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
    const wrapper = cy.render(<EditableTextarea />)

    expect(wrapper.hasClass('c-EditableTextarea')).toBeTruthy()
  })

  test('Can render custom className', () => {
    const customClassName = 'blue'
    const wrapper = cy.render(<EditableTextarea className={customClassName} />)

    expect(wrapper.hasClass(customClassName)).toBeTruthy()
  })
})

describe('HTML props', () => {
  test('Can render default HTML props', () => {
    cy.render(<EditableTextarea data-cy="BlueBlueBlue" />)
    const el = cy.getByCy('BlueBlueBlue')

    expect(el.exists()).toBeTruthy()
  })
})

describe('Label', () => {
  test('Renders label', () => {
    cy.render(<EditableTextarea />)
    const el = cy.get('.EditableTextarea__label')

    expect(el.exists()).toBeTruthy()
  })

  test('The label has the correct "for" attribute based of name', () => {
    cy.render(<EditableTextarea id="company" />)
    const el = cy.get('.EditableTextarea__label')
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
    cy.render(<EditableTextarea id="company" />)

    const textarea = cy.get('textarea')

    expect(textarea.getValue()).toBe('')
  })

  test('Value should be empty string if no value passed, placeholder should be present if passed', () => {
    cy.render(<EditableTextarea id="company" placeholder="Add something" />)

    const textarea = cy.get('textarea')

    expect(textarea.getAttribute('placeholder')).toBe('Add something')
  })

  test('Should assign a given value if passed on props', () => {
    cy.render(
      <EditableTextarea
        id="company"
        placeholder="Add something"
        value="Some Notes"
      />
    )

    const textarea = cy.get('textarea')

    expect(textarea.getValue()).toBe('Some Notes')
  })

  test('Should change a given value if passed on props', () => {
    const wrapper = cy.render(
      <EditableTextarea
        id="company"
        placeholder="Add something"
        value="hello"
      />
    )

    expect(cy.get('textarea').getValue()).toBe('hello')

    wrapper.setProps({ value: 'hola' })

    expect(cy.get('textarea').getValue()).toBe('hola')
  })

  test('Should not value if value passed on props is the same as initial prop', () => {
    const wrapper = cy.render(
      <EditableTextarea
        id="company"
        placeholder="Add something"
        value="hello"
      />
    )

    expect(cy.get('textarea').getValue()).toBe('hello')

    wrapper.setProps({ value: 'hello' })

    expect(cy.get('textarea').getValue()).toBe('hello')
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

    cy.render(<EditableTextarea id="company" onChange={spy} />)

    const textarea = cy.get('textarea')

    textarea.type('a')

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
      })
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
  test('should commit if value changes', () => {
    const onCommitSpy = jest.fn()

    cy.render(
      <EditableTextarea id="company" value="hello" onCommit={onCommitSpy} />
    )

    const textarea = cy.get('textarea')

    textarea.type('a')
    textarea.blur()

    const f = flushPromises()
    jest.runAllTimers()

    f.then(() => {
      expect(onCommitSpy).toHaveBeenCalled()
    })
  })

  test('should not commit if value unchanged', () => {
    const onCommitSpy = jest.fn()

    cy.render(
      <EditableTextarea id="company" value="hello" onCommit={onCommitSpy} />
    )

    const textarea = cy.get('textarea')

    textarea.type('hello')
    textarea.blur()

    const f = flushPromises()
    jest.runAllTimers()

    f.then(() => {
      expect(onCommitSpy).not.toHaveBeenCalled()
    })
  })

  test('Pressing Enter: should commit if value changes', () => {
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

    textarea.getDOMNode().value = '123'
    textarea.simulate('keydown', { key: 'Enter' })

    flushPromises().then(() => {
      wrapper.update()

      expect(onEnterSpy).toHaveBeenCalled()
      expect(onCommitSpy).toHaveBeenCalled()
    })
  })

  test('Pressing Enter: should not commit if value invalid', () => {
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
    })
  })

  test('should not run validate fn if value already validated', () => {
    const validateSpy = jest.fn()

    cy.render(
      <EditableTextarea id="company" value="hello" validate={validateSpy} />
    )

    const textarea = cy.get('textarea')

    textarea.type('hello')
    textarea.blur()
    const f = flushPromises()
    jest.runAllTimers()

    f.then(() => {
      expect(validateSpy).toHaveBeenCalled()
    })

    textarea.focus()
    textarea.blur()

    const t = flushPromises()
    jest.runAllTimers()

    t.then(() => {
      expect(validateSpy).not.toHaveBeenCalled()
    })
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
    cy.render(<EditableTextarea id="greeting" value="hello" />)

    expect(cy.get(`.${INPUT_CLASSNAMES.validation}`).exists()).toBeFalsy()
  })

  test('should render validation if invalid', () => {
    cy.render(
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

    const textarea = cy.get('textarea')

    textarea.type('hello')
    textarea.blur()

    const f = flushPromises()
    jest.runAllTimers()

    f.then(() => {
      expect(
        cy.get(`.${EditableTextarea.className}__validation`).exists()
      ).toBeTruthy()
      expect(
        cy.get(`.${STATES_CLASSNAMES.withValidation}`).exists()
      ).toBeTruthy()
    })
  })

  test('should not render validation if valid', () => {
    cy.render(
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

    const textarea = cy.get('textarea')

    textarea.type('hello')
    textarea.blur()

    const f = flushPromises()
    jest.runAllTimers()

    f.then(() => {
      expect(
        cy.get(`.${EditableTextarea.className}__validation`).exists()
      ).toBeFalsy()
      expect(
        cy.get(`.${STATES_CLASSNAMES.withValidation}`).exists()
      ).toBeFalsy()
    })
  })

  test('should not render validation if id mistmatches', () => {
    cy.render(
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

    const textarea = cy.get('textarea')

    textarea.type('hello')
    textarea.blur()

    const f = flushPromises()
    jest.runAllTimers()

    f.then(() => {
      expect(
        cy.get(`.${EditableTextarea.className}__validation`).exists()
      ).toBeFalsy()
      expect(
        cy.get(`.${STATES_CLASSNAMES.withValidation}`).exists()
      ).toBeFalsy()
    })
  })
})

describe('floating labels', () => {
  test('Adds the floating labels className', () => {
    const wrapper = cy.render(<EditableTextarea id="company" floatingLabels />)

    expect(wrapper.hasClass(STATES_CLASSNAMES.withFloatingLabels)).toBeTruthy()
  })

  test('Label is hidden when floating labels on', () => {
    cy.render(<EditableTextarea id="company" floatingLabels />)

    const el = cy.get(`.EditableTextarea__label`)

    expect(el.exists()).toBeFalsy()
  })
})

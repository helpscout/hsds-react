import React from 'react'
import { mount } from 'enzyme'
import { render } from '@testing-library/react'
import { EditableFieldInput } from '../EditableField.Input'
import {
  INPUT_CLASSNAMES,
  STATES_CLASSNAMES,
  OTHERCOMPONENTS_CLASSNAMES,
} from '../EditableField.utils'

describe('Should component update', () => {
  test('fieldValue', () => {
    const val = {
      value: 'hello',
      id: 'greeting_0',
    }
    const wrapper = mount(
      <EditableFieldInput name="greeting" fieldValue={val} />
    )
    const actualProps = wrapper.props()
    const newPropsSame = {
      ...actualProps,
    }
    const newPropsChanged = {
      ...actualProps,
      fieldValue: {
        value: 'hola',
        id: 'greeting_0',
      },
    }

    expect(wrapper.instance().shouldComponentUpdate(newPropsSame)).toBeFalsy()

    expect(
      wrapper.instance().shouldComponentUpdate(newPropsChanged)
    ).toBeTruthy()
  })

  test('isActive', () => {
    const val = {
      value: 'hello',
      id: 'greeting_0',
    }
    const wrapper = mount(
      <EditableFieldInput name="greeting" fieldValue={val} isActive />
    )
    const actualProps = wrapper.props()
    const newPropsSame = {
      ...actualProps,
    }
    const newPropsChanged = {
      ...actualProps,
      isActive: false,
    }

    expect(wrapper.instance().shouldComponentUpdate(newPropsSame)).toBeFalsy()

    expect(
      wrapper.instance().shouldComponentUpdate(newPropsChanged)
    ).toBeTruthy()
  })

  test('disabled', () => {
    const val = {
      value: 'hello',
      id: 'greeting_0',
    }
    const wrapper = mount(
      <EditableFieldInput name="greeting" fieldValue={val} isActive disabled />
    )
    const actualProps = wrapper.props()
    const newPropsSame = {
      ...actualProps,
    }
    const newPropsChanged = {
      ...actualProps,
      disabled: false,
    }

    expect(wrapper.instance().shouldComponentUpdate(newPropsSame)).toBeFalsy()

    expect(
      wrapper.instance().shouldComponentUpdate(newPropsChanged)
    ).toBeTruthy()
  })

  test('validationInfo', () => {
    const val = {
      value: 'hello',
      id: 'greeting_0',
    }
    const validationInfo = {
      isValid: false,
      name: 'email',
      value: 'hello',
      type: 'error',
    }
    const wrapper = mount(
      <EditableFieldInput name="greeting" fieldValue={val} />
    )
    const actualProps = wrapper.props()
    const newPropsSame = {
      ...actualProps,
    }
    const newPropsChanged = {
      ...actualProps,
      validationInfo,
    }

    expect(wrapper.instance().shouldComponentUpdate(newPropsSame)).toBeFalsy()

    expect(
      wrapper.instance().shouldComponentUpdate(newPropsChanged)
    ).toBeTruthy()
  })
})

describe('component did update', () => {
  test('should run setTitle', () => {
    const val = {
      value: 'hello',
      id: 'greeting_0',
    }
    const wrapper = mount(
      <EditableFieldInput name="greeting" fieldValue={val} />
    )

    const instance = wrapper.instance()

    jest.spyOn(instance, 'setInputTitle')

    wrapper.setProps({ fieldValue: { ...val, value: 'hola' } })

    expect(instance.setInputTitle).toHaveBeenCalled()
  })
})

describe('validation', () => {
  test('should not render validation if not passed', () => {
    const val = {
      value: 'hello',
      id: 'greeting_0',
    }
    const { container } = render(
      <EditableFieldInput name="greeting" fieldValue={val} />
    )

    expect(container.querySelector(`.${INPUT_CLASSNAMES.validation}`)).toBe(
      null
    )
  })

  test('should render validation if passed and name is correct', () => {
    const val = {
      value: 'hello',
      id: 'greeting_0',
    }
    const validationInfo = {
      isValid: false,
      name: 'greeting_0',
      value: 'hello',
      type: 'error',
    }

    const { container } = render(
      <EditableFieldInput
        name="greeting_0"
        fieldValue={val}
        validationInfo={validationInfo}
      />
    )

    expect(
      container.querySelector(`.${INPUT_CLASSNAMES.validation}`)
    ).toBeTruthy()
    expect(
      container.querySelector(`.${STATES_CLASSNAMES.withValidation}`)
    ).toBeTruthy()
  })

  test('should render alert icon by default', () => {
    const val = {
      value: 'hello',
      id: 'greeting_0',
    }
    const validationInfo = {
      isValid: false,
      name: 'greeting_0',
      value: 'hello',
      type: 'error',
    }

    const { container } = render(
      <EditableFieldInput
        name="greeting_0"
        fieldValue={val}
        validationInfo={validationInfo}
      />
    )
    expect(
      container
        .querySelector(`.${OTHERCOMPONENTS_CLASSNAMES.icon}`)
        .getAttribute('data-icon-name')
    ).toBe('alert-small')
  })

  test('should render custom icon', () => {
    const val = {
      value: 'hello',
      id: 'greeting_0',
    }
    const validationInfo = {
      isValid: false,
      name: 'greeting_0',
      value: 'hello',
      type: 'error',
      icon: 'cross',
    }

    const { container } = render(
      <EditableFieldInput
        name="greeting_0"
        fieldValue={val}
        validationInfo={validationInfo}
      />
    )
    expect(
      container
        .querySelector(`.${OTHERCOMPONENTS_CLASSNAMES.icon}`)
        .getAttribute('data-icon-name')
    ).toBe('cross')
  })

  test('should not render validation if passed and name is incorrect', () => {
    const val = {
      value: 'hello',
      id: 'greeting_0',
    }
    const validationInfo = {
      isValid: false,
      name: 'greeting_2',
      value: 'hello',
      type: 'error',
    }

    const { container } = render(
      <EditableFieldInput
        name="greeting_0"
        fieldValue={val}
        validationInfo={validationInfo}
      />
    )

    expect(container.querySelector(`.${INPUT_CLASSNAMES.validation}`)).toBe(
      null
    )
  })
})

describe('handle key up', () => {
  test('handleKeyPress', () => {
    const spy = jest.fn()
    const name = 'greeting_1'
    const fieldValue = { value: 'hello', id: name }
    const wrapper = mount(
      <EditableFieldInput
        name={name}
        fieldValue={fieldValue}
        onKeyPress={spy}
      />
    )
    const event = {
      key: 'J',
      currentTarget: {
        value: 'howdy',
      },
    }
    wrapper.instance().handleKeyPress(event)
    expect(spy).toHaveBeenCalledWith({ event, name })
  })

  test('handleKeyUp', () => {
    const spy = jest.fn()
    const name = 'greeting_1'
    const fieldValue = { value: 'hello', id: name }
    const wrapper = mount(
      <EditableFieldInput name={name} fieldValue={fieldValue} onKeyUp={spy} />
    )
    const event = {
      key: 'J',
      currentTarget: {
        value: 'howdy',
      },
    }
    wrapper.instance().handleKeyUp(event)
    expect(spy).toHaveBeenCalledWith({ event, name })
  })
})

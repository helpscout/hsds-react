import * as React from 'react'
import { mount } from 'enzyme'
import { cy } from '@helpscout/cyan'

import { EditableFieldInput } from '../EditableField.Input'
import {
  INPUT_CLASSNAMES,
  STATES_CLASSNAMES,
  OTHERCOMPONENTS_CLASSNAMES,
} from '../EditableField.utils'

import { Validation } from '../EditableField.types'

describe('Should component update', () => {
  test('fieldValue', () => {
    const val = {
      value: 'hello',
      id: 'greeting_0',
    }
    const wrapper: any = mount(
      <EditableFieldInput name="greeting" fieldValue={val} />
    )
    const actualProps = wrapper.props()

    expect(
      wrapper.instance().shouldComponentUpdate(
        {
          ...actualProps,
          fieldValue: {
            value: 'hello',
            id: 'greeting_0',
          },
        },
        actualProps
      )
    ).toBeFalsy()

    expect(
      wrapper.instance().shouldComponentUpdate(
        {
          ...actualProps,
          fieldValue: {
            value: 'hola',
            id: 'greeting_0',
          },
        },
        actualProps
      )
    ).toBeTruthy()
  })

  test('isActive', () => {
    const val = {
      value: 'hello',
      id: 'greeting_0',
    }
    const wrapper: any = mount(
      <EditableFieldInput name="greeting" fieldValue={val} isActive />
    )
    const actualProps = wrapper.props()

    expect(
      wrapper.instance().shouldComponentUpdate(
        {
          ...actualProps,
          isActive: true,
        },
        actualProps
      )
    ).toBeFalsy()

    expect(
      wrapper.instance().shouldComponentUpdate(
        {
          ...actualProps,
          isActive: false,
        },
        actualProps
      )
    ).toBeTruthy()
  })

  test('disabled', () => {
    const val = {
      value: 'hello',
      id: 'greeting_0',
    }
    const wrapper: any = mount(
      <EditableFieldInput name="greeting" fieldValue={val} isActive disabled />
    )
    const actualProps = wrapper.props()

    expect(
      wrapper.instance().shouldComponentUpdate(
        {
          ...actualProps,
          disabled: true,
        },
        actualProps
      )
    ).toBeFalsy()

    expect(
      wrapper.instance().shouldComponentUpdate(
        {
          ...actualProps,
          disabled: false,
        },
        actualProps
      )
    ).toBeTruthy()
  })

  test('validationInfo', () => {
    const val = {
      value: 'hello',
      id: 'greeting_0',
    }
    const validationInfo: Validation = {
      isValid: false,
      name: 'email',
      value: 'hello',
      type: 'error',
    }
    const wrapper: any = mount(
      <EditableFieldInput name="greeting" fieldValue={val} />
    )
    const actualProps = wrapper.props()

    expect(
      wrapper.instance().shouldComponentUpdate(
        {
          ...actualProps,
        },
        actualProps
      )
    ).toBeFalsy()

    expect(
      wrapper.instance().shouldComponentUpdate(
        {
          ...actualProps,
          validationInfo,
        },
        actualProps
      )
    ).toBeTruthy()
  })
})

describe('component did update', () => {
  test('should run setTitle', () => {
    const val = {
      value: 'hello',
      id: 'greeting_0',
    }
    const wrapper: any = mount(
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
    cy.render(<EditableFieldInput name="greeting" fieldValue={val} />)

    expect(cy.get(`.${INPUT_CLASSNAMES.validation}`).exists()).toBeFalsy()
  })

  test('should render validation if passed and name is correct', () => {
    const val = {
      value: 'hello',
      id: 'greeting_0',
    }
    const validationInfo: Validation = {
      isValid: false,
      name: 'greeting_0',
      value: 'hello',
      type: 'error',
    }

    cy.render(
      <EditableFieldInput
        name="greeting_0"
        fieldValue={val}
        validationInfo={validationInfo}
      />
    )

    expect(cy.get(`.${INPUT_CLASSNAMES.validation}`).exists()).toBeTruthy()
    expect(cy.get(`.${STATES_CLASSNAMES.withValidation}`).exists()).toBeTruthy()
  })

  test('should render alert icon by default', () => {
    const val = {
      value: 'hello',
      id: 'greeting_0',
    }
    const validationInfo: Validation = {
      isValid: false,
      name: 'greeting_0',
      value: 'hello',
      type: 'error',
    }

    cy.render(
      <EditableFieldInput
        name="greeting_0"
        fieldValue={val}
        validationInfo={validationInfo}
      />
    )
    expect(
      cy
        .get(`.${OTHERCOMPONENTS_CLASSNAMES.icon}`)
        .getAttribute('data-icon-name')
    ).toBe('alert')
  })

  test('should render custom icon', () => {
    const val = {
      value: 'hello',
      id: 'greeting_0',
    }
    const validationInfo: Validation = {
      isValid: false,
      name: 'greeting_0',
      value: 'hello',
      type: 'error',
      icon: 'cross',
    }

    cy.render(
      <EditableFieldInput
        name="greeting_0"
        fieldValue={val}
        validationInfo={validationInfo}
      />
    )
    expect(
      cy
        .get(`.${OTHERCOMPONENTS_CLASSNAMES.icon}`)
        .getAttribute('data-icon-name')
    ).toBe('cross')
  })

  test('should not render validation if passed and name is incorrect', () => {
    const val = {
      value: 'hello',
      id: 'greeting_0',
    }
    const validationInfo: Validation = {
      isValid: false,
      name: 'greeting_2',
      value: 'hello',
      type: 'error',
    }

    cy.render(
      <EditableFieldInput
        name="greeting_0"
        fieldValue={val}
        validationInfo={validationInfo}
      />
    )

    expect(cy.get(`.${INPUT_CLASSNAMES.validation}`).exists()).toBeFalsy()
  })
})

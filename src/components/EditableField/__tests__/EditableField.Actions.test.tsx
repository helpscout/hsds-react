import * as React from 'react'
import { cy } from '@helpscout/cyan'
import { mount } from 'enzyme'
import { EditableFieldActions as Actions } from '../EditableField.Actions'

import { STATES_CLASSNAMES } from '../EditableField.utils'

import { Validation } from '../EditableField.types'

const validationInfo: Validation = {
  isValid: false,
  name: 'email',
  value: 'hello',
  type: 'error',
}

describe('Rendering', () => {
  test('actions should not be focusable', () => {
    const val = {
      value: 'hello',
      id: 'greeting_0',
    }

    cy.render(
      <Actions
        name="email"
        fieldValue={val}
        actions={[
          {
            name: 'delete',
          },
        ]}
      />
    )

    expect(cy.get('.action-delete').getAttribute('tabindex')).toBe('-1')
  })

  test('should have with-validation class if validation info is present', () => {
    const val = {
      value: 'hello',
      id: 'greeting_0',
    }

    const wrapper = cy.render(
      <Actions
        name="email"
        fieldValue={val}
        validationInfo={validationInfo}
        actions={[
          {
            name: 'delete',
          },
        ]}
      />
    )

    expect(wrapper.hasClass(STATES_CLASSNAMES.withValidation)).toBeTruthy()
  })
})

describe('Should component update', () => {
  test('fieldValue', () => {
    const val = {
      value: 'hello',
      id: 'greeting_0',
    }

    const wrapper: any = mount(
      <Actions name="email" fieldValue={val} actions={[]} />
    )
    const actualProps = wrapper.props()
    const newSameProps = {
      ...actualProps,
      fieldValue: {
        value: 'hello',
        id: 'greeting_0',
      },
    }

    expect(
      wrapper.instance().shouldComponentUpdate(newSameProps, actualProps)
    ).toBeFalsy()

    const newProps = {
      ...actualProps,
      fieldValue: {
        value: 'hola',
        id: 'greeting_0',
      },
    }

    expect(
      wrapper.instance().shouldComponentUpdate(newProps, actualProps)
    ).toBeTruthy()
  })
})

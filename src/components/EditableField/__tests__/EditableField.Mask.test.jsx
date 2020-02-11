import React from 'react'
import PropTypes from 'prop-types'
import { cy } from '@helpscout/cyan'

import { EditableFieldMask as Mask } from '../EditableField.Mask'

import { TRUNCATED_CLASSNAMES, STATES_CLASSNAMES } from '../EditableField.utils'

describe('class names', () => {
  test('validation', () => {
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

    cy.render(
      <Mask
        type="email"
        name="email"
        fieldValue={val}
        validationInfo={validationInfo}
      />
    )

    expect(cy.get(`.${STATES_CLASSNAMES.withValidation}`).exists()).toBeTruthy()
  })

  test('disabled', () => {
    const val = {
      value: 'hello',
      id: 'greeting_0',
    }

    cy.render(<Mask type="email" name="email" fieldValue={val} disabled />)

    expect(cy.get(`.${STATES_CLASSNAMES.isDisabled}`).exists()).toBeTruthy()
  })
})

describe('email type', () => {
  test('should truncate', () => {
    const val = {
      value: 'email@somethingcool.com',
      id: 'email_0',
    }

    cy.render(<Mask type="email" name="email" fieldValue={val} />)

    expect(
      cy.get(`.${TRUNCATED_CLASSNAMES.withSplitter}`).exists()
    ).toBeTruthy()
    expect(cy.get(`.${TRUNCATED_CLASSNAMES.firstChunk}`).exists()).toBeTruthy()
    expect(cy.get(`.${TRUNCATED_CLASSNAMES.secondChunk}`).exists()).toBeTruthy()
    expect(cy.get(`.${TRUNCATED_CLASSNAMES.firstChunk}`).text()).toBe('email')
    expect(cy.get(`.${TRUNCATED_CLASSNAMES.secondChunk}`).text()).toBe(
      '@somethingcool.com'
    )
  })
})

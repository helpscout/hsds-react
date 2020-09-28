import React from 'react'
import { render } from '@testing-library/react'
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

    const { container } = render(
      <Mask
        type="email"
        name="email"
        fieldValue={val}
        validationInfo={validationInfo}
      />
    )

    expect(
      container.querySelector(`.${STATES_CLASSNAMES.withValidation}`)
    ).toBeTruthy()
  })

  test('disabled', () => {
    const val = {
      value: 'hello',
      id: 'greeting_0',
    }

    const { container } = render(
      <Mask type="email" name="email" fieldValue={val} disabled />
    )

    expect(
      container.querySelector(`.${STATES_CLASSNAMES.isDisabled}`)
    ).toBeTruthy()
  })
})

describe('email type', () => {
  test('should truncate', () => {
    const val = {
      value: 'email@somethingcool.com',
      id: 'email_0',
    }

    const { container } = render(
      <Mask type="email" name="email" fieldValue={val} />
    )

    expect(
      container.querySelector(`.${TRUNCATED_CLASSNAMES.withSplitter}`)
    ).toBeTruthy()
    expect(
      container.querySelector(`.${TRUNCATED_CLASSNAMES.firstChunk}`)
    ).toBeTruthy()
    expect(
      container.querySelector(`.${TRUNCATED_CLASSNAMES.secondChunk}`)
    ).toBeTruthy()
    expect(
      container.querySelector(`.${TRUNCATED_CLASSNAMES.firstChunk}`).textContent
    ).toBe('email')
    expect(
      container.querySelector(`.${TRUNCATED_CLASSNAMES.secondChunk}`)
        .textContent
    ).toBe('@somethingcool.com')
  })
})

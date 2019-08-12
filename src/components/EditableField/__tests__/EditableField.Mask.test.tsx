import * as React from 'react'
import { cy } from '@helpscout/cyan'
import { EditableFieldMask as Mask } from '../EditableField.Mask'
import { TRUNCATED_CLASSNAMES } from '../EditableField.utils'

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
    expect(
      cy.get(`.${TRUNCATED_CLASSNAMES.splitterChunk}`).exists()
    ).toBeTruthy()
    expect(cy.get(`.${TRUNCATED_CLASSNAMES.secondChunk}`).exists()).toBeTruthy()
    expect(cy.get(`.${TRUNCATED_CLASSNAMES.firstChunk}`).text()).toBe('email')
    expect(cy.get(`.${TRUNCATED_CLASSNAMES.splitterChunk}`).text()).toBe('@')
    expect(cy.get(`.${TRUNCATED_CLASSNAMES.secondChunk}`).text()).toBe(
      'somethingcool.com'
    )
  })
})

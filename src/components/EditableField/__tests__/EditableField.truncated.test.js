import React from 'react'
import { cy } from '@helpscout/cyan'
import Truncated from '../EditableField.Truncated'
import { TRUNCATED_CLASSNAMES } from '../EditableField.utils'

describe('Editable Field truncate', () => {
  test('should truncate with HSDS truncate if no splitter provided', () => {
    cy.render(<Truncated string="001122334455677889900" />)

    expect(cy.get(`.${TRUNCATED_CLASSNAMES.component}`).exists()).toBeTruthy()
  })

  test('should truncate with with splitter if provided', () => {
    cy.render(<Truncated string="email@something.com" splitter="@" />)

    expect(
      cy.get(`.${TRUNCATED_CLASSNAMES.withSplitter}`).exists()
    ).toBeTruthy()
    expect(cy.get(`.${TRUNCATED_CLASSNAMES.firstChunk}`).exists()).toBeTruthy()
    expect(cy.get(`.${TRUNCATED_CLASSNAMES.secondChunk}`).exists()).toBeTruthy()
    expect(cy.get(`.${TRUNCATED_CLASSNAMES.firstChunk}`).text()).toBe('email')
    expect(cy.get(`.${TRUNCATED_CLASSNAMES.secondChunk}`).text()).toBe(
      '@something.com'
    )
  })
})

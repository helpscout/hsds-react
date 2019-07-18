import * as React from 'react'
import { cy } from '@helpscout/cyan'
import Truncated from '../EditableField.Truncate'

describe('Editable Field truncate', () => {
  test('should truncate with HSDS truncate if no splitter provided', () => {
    cy.render(<Truncated string="001122334455677889900" />)

    expect(cy.get('.Truncated').exists()).toBeTruthy()
  })

  test('should truncate with with splitter if provided', () => {
    cy.render(<Truncated string="email@something.com" splitter="@" />)

    expect(cy.get('.TruncatedWithSplitter').exists()).toBeTruthy()
    expect(cy.get('.TruncateFirstChunk').exists()).toBeTruthy()
    expect(cy.get('.TruncateSplitterChunk').exists()).toBeTruthy()
    expect(cy.get('.TruncateSecondChunk').exists()).toBeTruthy()
    expect(cy.get('.TruncateFirstChunk').text()).toBe('email')
    expect(cy.get('.TruncateSplitterChunk').text()).toBe('@')
    expect(cy.get('.TruncateSecondChunk').text()).toBe('something.com')
  })
})

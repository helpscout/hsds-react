import React from 'react'
import { cy } from '@helpscout/cyan'
import Message from '../index'

describe('Export', () => {
  test('Correctly exports sub-components', () => {
    cy.render(<Message />)
    cy.render(<Message.Action />)
    cy.render(<Message.Attachment />)
    cy.render(<Message.Bubble />)
    cy.render(<Message.Caption />)
    cy.render(<Message.Chat />)
    cy.render(<Message.Content />)
    cy.render(<Message.Embed />)
    cy.render(<Message.Media />)
    cy.render(<Message.Provider />)
    cy.render(<Message.Question />)
  })
})

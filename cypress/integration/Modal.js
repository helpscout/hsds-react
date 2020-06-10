beforeEach(() => {
  cy.visitStory('components-overlay-modal--v-2-default')
})

describe('Modal', () => {
  it('Should open a modal', () => {
    cy.get('button:first').click()
    cy.get('[data-cy="Modal"]').should('exist')
  })
})

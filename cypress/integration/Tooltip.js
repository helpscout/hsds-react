beforeEach(() => {
  cy.visitStory('components-overlay-tooltipv2--default')
})

describe('Tooltip', () => {
  it('Should open a tooltip', () => {
    cy.get('body').click() // make sure to hide any visible tooltip
    cy.get('[data-cy="Tooltip"]').click()
    cy.get('[data-tippy-root]').should('exist')
  })
})

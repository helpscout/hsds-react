beforeEach(() => {
  cy.visitStory('components-dropdowns-dropdown--dropdown-default')
})

describe('Dropdown', () => {
  it('Should open a Dropdown', () => {
    cy.get('[data-cy="DropdownTrigger"]').click()
    cy.get('.DropdownMenuContainerPlacementRoot').should('exist')
  })
})

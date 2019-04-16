beforeEach(() => {
  cy.visitStory('Pagination', 'in action')
})

describe('Pagination / range', () => {
  it('Should display total of items', () => {
    cy.get('[data-cy="Pagination-totalItems"]').should('be', '255')
  })

  it('End range and total should be the same on last page', () => {
    cy.get('[data-cy="Pagination-totalItems"]').should('be', '255')
    cy.get('[data-cy="Pagination-endRange"]').should('be', '255')
  })
})

describe('Pagination / navigation', () => {
  it('Prev/First should be hidden on first page', () => {
    cy.get('[data-cy="Pagination-prevButton"]').should('not.exist')
    cy.get('[data-cy="Pagination-firstButton"]').should('not.exist')
  })
  it('Prev/First should be visible on second page', () => {
    cy.get('[data-cy="Pagination-nextButton"]:first').click()
    cy.get('[data-cy="Pagination-prevButton"]').should('exist')
    cy.get('[data-cy="Pagination-firstButton"]').should('exist')
  })

  it('Last/Next should be disabled on last page', () => {
    cy.get('[data-cy="Pagination-lastButton"]:first').click()
    cy.get('[data-cy="Pagination-lastButton"]').should('be.disabled')
    cy.get('[data-cy="Pagination-nextButton"]').should('be.disabled')
  })

  it('Can increase current page', () => {
    const startRange = cy.get('[data-cy="Pagination-startRange"]')
    startRange.should('be', '1')
    startRange.invoke('text').then(originalValue => {
      originalValue = parseInt(originalValue, 10)
      const nextValue = originalValue + 50

      cy.get('[data-cy="Pagination-nextButton"]:first').click()
      cy
        .get('[data-cy="Pagination-startRange"]')
        .should('be', nextValue.toString())
    })
  })

  it('Can decrease current page', () => {
    const startRange = cy.get('[data-cy="Pagination-startRange"]')
    cy.get('[data-cy="Pagination-nextButton"]:first').click()
    startRange.should('be', '51')

    startRange.invoke('text').then(originalValue => {
      originalValue = parseInt(originalValue, 10)
      const nextValue = originalValue - 50

      cy.get('[data-cy="Pagination-prevButton"]:first').click()
      cy
        .get('[data-cy="Pagination-startRange"]')
        .should('be', nextValue.toString())
    })
  })
})

describe('Pagination / keyboard', () => {
  it('Typing K should increase the current page', () => {
    cy.get('body').trigger('keydown', { keyCode: 75, which: 75 })

    const startRange = cy.get('[data-cy="Pagination-startRange"]')
    startRange.invoke('text').then(originalValue => {
      originalValue = parseInt(originalValue, 10)
      const nextValue = originalValue + 50

      cy
        .get('[data-cy="Pagination-startRange"]')
        .should('be', nextValue.toString())
    })
  })

  it('Typing J should decrease the current page', () => {
    cy.get('[data-cy="Pagination-nextButton"]:first').click()

    const startRange = cy.get('[data-cy="Pagination-startRange"]')
    startRange.invoke('text').then(originalValue => {
      originalValue = parseInt(originalValue, 10)
      const nextValue = originalValue - 50

      cy.get('body').trigger('keydown', { keyCode: 74, which: 74 })

      cy
        .get('[data-cy="Pagination-startRange"]')
        .should('be', nextValue.toString())
    })
  })
})

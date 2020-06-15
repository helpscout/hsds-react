describe('Button', function() {
  it('Can click a Button', function() {
    cy.visitStory('components-buttons-button--default')

    cy.get('[data-cy="Button"]:first').click()
  })
})

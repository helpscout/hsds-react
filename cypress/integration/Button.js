describe('Button', function() {
  it('Can click a Button', function() {
    cy.visitStory('Button', 'everything')

    cy.get('[data-cy="Button"]:first').click()
  })
})

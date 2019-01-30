describe('Button', function() {
  it('Can click a Button', function() {
    cy.visit('iframe.html?selectedKind=Button%2FV2&selectedStory=everything')

    cy.get('[data-cy="Button"]:first').click()
  })
})

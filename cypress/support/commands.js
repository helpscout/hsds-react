// ***********************************************
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

Cypress.Commands.add('visitStory', (kind = '', name = '') => {
  const url = getStoryBookUrl(kind, name)

  return cy.visit(url)
})

/**
 * Generates the iFrame URL for a given component/story.
 * @param {string} kind The Component
 * @param {string} name The name of the Story
 */
function getStoryBookUrl(kind = 'ArticleCard', name = 'Content') {
  return `iframe.html?selectedKind=${kind}&selectedStory=${name}`
}

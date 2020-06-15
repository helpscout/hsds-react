// ***********************************************
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

Cypress.Commands.add('visitStory', (id = '') => {
  const url = getStoryBookUrl(id)

  return cy.visit(url)
})

/**
 * Generates the iFrame URL for a given component/story.
 * @param {string} id the url id attribute of a story
 */
function getStoryBookUrl(id = '') {
  return `iframe.html?id=${id}`
}

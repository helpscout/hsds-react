# Cypress Testing

## Running

To run the automated test suite, run this command:

```
npm run test:cy
```

The above command will build and serve the Storybook on `localhost`, run the tests, and stop the `localhost` server.

For the interactive Cypress GUI, you can run:

```
npm run cy:open
```

Note: You'll have to have the Storybook running. You can do this by running:

```
npm start
```

The one liner would be:

```
npm start && npm run cy:open
```

## Adding Tests

The Cypress tests are located in the `cypress/integration` directory of this project:

```
hsds-react/
  └── cypress/
    └── integration/
      └── MyTest.js
```

## Testing StoryBook

You can hit a Storybook URL by using the `cy.visitStory` command:

```js
describe('Button', function() {
  it('Can click a Button', function() {
    // Visits the Button component, with the "everything" story.
    cy.visitStory('Button', 'everything')

    cy.get('[data-cy="Button"]:first').click()
  })
})
```

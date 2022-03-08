import '@testing-library/cypress/add-commands'
import { getBySel } from './commands'

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Custom command to select DOM element by data-test attribute.
       * @example cy.getBySel('greeting')
       */
      getBySel: typeof getBySel
    }
  }
}

Cypress.Commands.add('getBySel', getBySel)

beforeEach(() => {
  cy.task('db:seed')
})

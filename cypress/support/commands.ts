export function getBySel(
  selector: string,
  ...args: (
    | Partial<
        Cypress.Loggable &
          Cypress.Timeoutable &
          Cypress.Withinable &
          Cypress.Shadow
      >
    | undefined
  )[]
) {
  // deepcode ignore PromiseNotCaughtGeneral: <for failing fast>
  return cy.get(`[data-test=${selector}]`, ...args)
}

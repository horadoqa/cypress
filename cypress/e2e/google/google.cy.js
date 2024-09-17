describe('Google', () => {
    it('passes', () => {
      cy.visit('https://www.google.com')

      cy.get('textarea[name="q"]').type('Cypress{enter}');

      cy.get('h3').should('contains.text', 'Cypress: Testing Frameworks for Javascript | Write, Run, Debug')

      cy.get('a h3').click()
    })
  })
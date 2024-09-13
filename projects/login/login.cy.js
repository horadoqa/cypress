it('user should be able to log in', () => {
  cy.visit('/login')

  // fill in the form
  cy.get('input[type="email"]').type('test@test.com')
  cy.get('input[type="password"]').type('test1234')

  // submit the form
  cy.get('button').contains('Sign in').click()
  cy.contains('button', 'Logout').should('be.visible')
}) 
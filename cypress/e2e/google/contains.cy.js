describe('Google', () => {
  
  it('Acessar o Google', () => {
    cy.visit('https://www.google.com');

    // Aguarda o campo de busca estar disponível
    cy.get('textarea[name="q"]', { timeout: 15000 })
      .should('be.visible') // Verifica se o campo é visível
      .type('Cypress{enter}', { delay: 100 });

      // Verifica se o título do resultado contém o texto esperado
    cy.get('h3')
    .contains('Cypress: Testing Frameworks for Javascript | Write, Run, Debug')
    .should('exist');

    // Clica no primeiro resultado
    cy.get('h3').first().click();

  });
  
  it('Validate', () => {
    
    // Verifica se o texto "Test. Automate. Accelerate." está presente na página
    cy.visit('https://www.cypress.io', () => {
      cy.contains('Test. Automate. Accelerate.', { timeout: 10000 })
      .should('exist');
    })
  })

});

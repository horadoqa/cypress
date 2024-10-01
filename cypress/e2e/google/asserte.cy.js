describe('Google', () => {
  
    it('Acessar o Google e buscar por Cypress', () => {
      cy.visit('https://www.google.com');
  
      // Aguarda o campo de busca estar disponível
      cy.get('textarea[name="q"]', { timeout: 15000 }) // Corrigido para 'input'
        .should('be.visible') // Verifica se o campo é visível
        .clear() // Limpa o campo antes de digitar
        .type('Cypress{enter}', { delay: 100 });
  
      // Verifica se o título do resultado contém o texto esperado
      cy.get('h3')
        .contains('Cypress: Testing Frameworks for Javascript | Write, Run, Debug')
        .should('exist');
  
      // Clica no primeiro resultado
      cy.get('h3').first().click();
    });
    
    it('Validar texto na página do Cypress', () => {
      cy.visit('https://www.cypress.io');
  
      // Verifica se o texto "Test. Automate. Accelerate." está presente na página
      cy.contains('Test. Automate. Accelerate.', { timeout: 10000 })
        .then((element) => {
          // Assert para validar que o texto existe
          assert.isNotNull(element, 'Texto "Test. Automate. Accelerate." está presente na página');
        });
    });
  });
  
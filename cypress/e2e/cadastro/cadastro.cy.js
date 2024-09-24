describe('Cadastro de Usuário', () => {
    it('Deve permitir o cadastro com sucesso', () => {
      cy.visit('/cadastro');
      cy.get('#name').type('João Silva');
      cy.get('#email').type('joao@example.com');
      cy.get('#phone').type('123456789');
      cy.get('#country').select('Brasil');
      cy.get('#submitButton').click();
      cy.contains('Cadastro realizado com sucesso').should('be.visible');
    });
  });
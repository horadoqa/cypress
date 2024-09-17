describe('Selecionar item de um select', () => {
    
    it('Deve selecionar um item pelo valor', () => {
      cy.visit('http://127.0.0.1:5500/cypress/e2e/select/index.html');
  
      // Seleciona o <select> pelo ID e escolhe o valor "2"
      cy.get('#select-itens').select('2');
  
      // Verifica se o item selecionado tem o valor esperado
      cy.get('#select-itens').should('have.value', '2');
    });

    it('Deve selecionar um item pelo texto visível', () => {
        cy.visit('http://127.0.0.1:5500/cypress/e2e/select/index.html'); // Substitua pela URL da sua página
    
        // Seleciona o <select> pelo ID e escolhe o item com texto "Item 2"
        cy.get('#select-itens').select('Item 2');
    
        // Verifica se o item selecionado tem o valor esperado
        cy.get('#select-itens').should('have.value', '2');
      });

      it('Deve selecionar o primeiro item', () => {
        cy.visit('http://127.0.0.1:5500/cypress/e2e/select/index.html'); // Substitua pela URL da sua página
    
        // Seleciona o <select> pelo ID e escolhe o primeiro item
        cy.get('#select-itens').select(0);
    
        // Verifica se o item selecionado tem o valor esperado
        cy.get('#select-itens').should('have.value', '1');
      });

      it('Deve selecionar um item e verificar a seleção', () => {
        cy.visit('http://127.0.0.1:5500/cypress/e2e/select/index.html'); // Substitua pela URL da sua página
    
        // Seleciona o item com valor "3"
        cy.get('#select-itens').select('3');
    
        // Verifica se o item selecionado tem o valor esperado
        cy.get('#select-itens').should('have.value', '3');
    
        // Opcional: Verifica o texto visível do item selecionado
        cy.get('#select-itens').find('option:selected').should('contain.text', 'Item 3');
      });

  });
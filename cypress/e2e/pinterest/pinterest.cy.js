describe('Pinterest', () => {
    it('passes', () => {
      cy.visit('https://www.pinterest.com/ideas/')

      cy.contains('h3', 'Animals').click({force: true});
    })

    it('Validate', () => {
    
      cy.visit('https://br.pinterest.com/ideas/animais/919400683386/')
      cy.get('div h1').should('have.text', 'Animais')
  
    });

  })
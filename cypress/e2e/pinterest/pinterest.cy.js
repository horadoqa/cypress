describe('Pinterest', () => {
    it('Acessando o site', () => {
      cy.visit('https://br.pinterest.com/ideas/')

      cy.contains('h3', 'Animals').click({force: true});
    })

    it('Validando', () => {
    
      cy.visit('https://br.pinterest.com/ideas/animais/919400683386/')
      cy.get('div h1').should('have.text', 'Animais')
  
    });

  })
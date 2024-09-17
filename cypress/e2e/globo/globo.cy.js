describe('Home da Globo', () => {
    
    it('passes', () => {
      cy.visit('https://www.globo.com')
    })

    it('Validate', () => {
    
        cy.visit('https://www.globo.com')
        cy.get('title').should('have.text', 'globo.com - Absolutamente tudo sobre notícias, esportes e entretenimento')
    
      });

  })
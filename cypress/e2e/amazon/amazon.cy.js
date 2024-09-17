describe('Amazon', () => {
    it('passes', () => {
      cy.visit('https://www.amazon.com.br')

      cy.get('#twotabsearchtextbox').type('apple 2024 macbook air de 13 polegadas, chip m3')

      cy.get('#nav-search-submit-button').click()
    
    //   cy.get('span').should('have.text', 'Apple 2024 MacBook Air (de 13 polegadas, Chip M3 da Apple com CPU de oito núcleos e GPU de oito núcleos, 8GB Memória unificada, de 256 GB) - Cinza-espaciall').click({force: true})
      
      cy.get('#buy-now-button').click()

    })
  })
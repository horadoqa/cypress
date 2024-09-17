describe('Acessar site do Youtube', () => {
    
    it('Acessar o site', () => {
      
      cy.visit('https://www.youtube.com', {timeout: 10000})

      cy.get('#search-input').type('Positive Jazz - Smooth Piano Jazz Music & Relaxing September Bossa Nova instrumental for Good mood')

      cy.get('#search-icon-legacy').click()


    })

    // Funcionando !!!

    it('Validate', () => {
    
      cy.visit('https://www.youtube.com/watch?v=-ZW0vCYiKGM')
    
      cy.get('h1').should('contains.text', 'Positive Jazz - Smooth Piano Jazz Music & Relaxing September Bossa Nova instrumental for Good mood')
    });

  })
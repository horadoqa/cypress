describe('Acessar site do Youtube', () => {
    
    it('Acessar o site', () => {
      
      cy.visit('https://www.youtube.com')

      cy.get('#search-input').type('Positive Jazz - Smooth Piano Jazz Music & Relaxing September Bossa Nova instrumental for Good mood')

      cy.get('#search-icon-legacy').click()

      cy.get('#inline-title-icon').should('contains.text', 'Positive Jazz - Smooth Piano Jazz Music & Relaxing September Bossa Nova instrumental for Good mood').click()
      
    })

    // Funcionando !!!

    it('Validate', () => {
      cy.get('h1').should('contains.text', 'Positive Jazz - Smooth Piano Jazz Music & Relaxing September Bossa Nova instrumental for Good mood')
    });

  })
describe('malu', () => {

    it('Acessando o site', () => {
      cy.visit('https://ri.magazineluiza.com.br')

      cy.get('#Form1').contains('Informações Financeiras').eq(0).click({force: true});

      cy.get('button').contains('Informações Financeiras').click({force: true});

      cy.get('li').contains('Planilha de Resultado').click({force: true});

      cy.get('a').contains('Planilha de Resultados Trimestrais').click({force: true});
    })

    // it('Validate', () => {
    
    //   cy.visit('')
    //   cy.get('').should('have.text', '')
  
    // });

  })

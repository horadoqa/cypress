describe('Globoplay', () => {
    it('passes', () => {
      cy.visit('https://globoplay.globo.com/');

      cy.get('a.gplay-button.gplay-button--sales.gplay-button--focus-light.headband__button').should('have.text', 'Assine já').click({force: true})

      // Redirect para Vitrine
      cy.visit('https://vitrine.globo.com/globoplay?f_area=home&f_cpnt=banner_vendas&f_label=assinatura.assine_ja&url=https:%2F%2Fgloboplay.globo.com%2F&origemId=91628');
      
      cy.get('p.auth__button__title').should('have.text', 'Conta Globo').click();

      cy.get('a.Link__StyledLink-sc-1qc335g-0.dKAENH').should('have.text', 'Criar conta').click();

      cy.get('#nome').type('Ricardo Fahham');
      cy.get('#email').type('horadoqa@gmail.com');
      cy.get('#senha').type('1234567890');
      cy.get('#nascimento').type('01071971');
      cy.get('#termsOfUse').click()

    })
  })
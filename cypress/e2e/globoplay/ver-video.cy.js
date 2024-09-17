describe('Globoplay', () => {
    it('passes', () => {
      cy.visit('https://globoplay.globo.com/');

      cy.get('#app').click();


      //*[@id="app"]/div/div/div[1]/div[2]/header/div[2]/div/div
      cy.visit('https://globoplay.globo.com/busca/');
      
      cy.get('#search-bar-input').type('O Auto da Compadecida').click()

      cy.get('img.poster__image').should('have.text', 'O Auto Da Compadecida').click()


      // cy.get('a.gplay-button.gplay-button--sales.gplay-button--focus-light.headband__button').should('have.text', 'Assine já').click({force: true})

      // //Vitrine
      // cy.visit('https://vitrine.globo.com/globoplay?f_area=home&f_cpnt=banner_vendas&f_label=assinatura.assine_ja&url=https:%2F%2Fgloboplay.globo.com%2F&origemId=91628');
      
      // cy.get('p.auth__button__title').should('have.text', 'Conta Globo').click()

      // cy.get('a.Link__StyledLink-sc-1qc335g-0.dKAENH').should('have.text', 'Criar conta').click()

      // cy.get('#name').type('Ricardo Fahham');
      // cy.get('#email').type('horadoqa@gmail.com');
      // cy.get('#senha').type('1234567890');
      // cy.get('#nascimento').select('01/07/1971');
      // cy.get('#termsOfUse').click()

    })
  })
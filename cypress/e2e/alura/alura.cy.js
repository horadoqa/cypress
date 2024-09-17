describe('Site do Alura Cursos', () => {
   
  it('Site do Alura Cursos', () => {
    
    cy.visit('https://www.alura.com.br');
    cy.get('div.categories__wrapper--home.--inteligencia-artificial').click();

  })

  it('Validate', () => {
    
    cy.visit('https://www.alura.com.br/escola-inteligencia-artificial')
    cy.get('h1').should('have.text', 'Inteligência Artificial')

  });

})
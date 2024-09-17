describe('Site do Alura Cursos', () => {
   
  it('alura', () => {
    
    cy.visit('https://www.alura.com.br');
    cy.contains('h2', 'Inteligência Artificial').click({force: true});

  })

  it('Validate', () => {
    
    cy.visit('https://www.alura.com.br/escola-inteligencia-artificial')
    cy.get('h1').should('have.text', 'Inteligência Artificial')

  });

})
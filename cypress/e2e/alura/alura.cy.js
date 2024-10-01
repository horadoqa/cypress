describe('Site do Alura Cursos', () => {
  
  it('Acessar a página de Inteligência Artificial', () => {
    cy.visit('https://www.alura.com.br');

    // Aguarda a presença do elemento antes de clicar
    cy.get('div.categories__wrapper--home.--inteligencia-artificial', { timeout: 10000 })
      .should('be.visible') // Verifica se o elemento é visível
      .click();
  });

  it('Validar título da página de Inteligência Artificial', () => {
    cy.visit('https://www.alura.com.br/escola-inteligencia-artificial');

    // Aguarda a presença do título e valida seu texto
    cy.get('h1', { timeout: 10000 })
      .should('have.text', 'Inteligência Artificial');
  });

});
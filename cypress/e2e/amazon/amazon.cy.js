describe('Amazon', () => {
  
  it('Busca do Mac na página da Amazon', () => {
    cy.visit('https://www.amazon.com.br', { timeout: 10000 });

    cy.get('#twotabsearchtextbox')
      .type('Apple 2024 macbook air de 13 polegadas, chip m3');

    cy.get('#nav-search-submit-button')
      .click();
  });

  it('Comprar', () => {
    cy.visit('https://www.amazon.com.br/s?k=Apple+2024+macbook+air+de+13+polegadas%2C+chip+m3', { timeout: 10000 });

    // Use a more stable selector instead of XPath (if possible)
    cy.get('h2 a span')
      .contains('Apple 2024 MacBook Air (de 13 polegadas, Chip M3 da Apple com CPU de oito núcleos e GPU de dez núcleos, 8GB Memória unificada, de 512 GB) - Meia-noite', { timeout: 10000 })
      .click();

    cy.get('#buy-now-button').click();
  });

});
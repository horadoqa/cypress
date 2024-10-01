describe('Amazon', () => {
  
  it('Busca do Mac na página da Amazon', () => {
    cy.visit('https://www.amazon.com.br');

    cy.get('#twotabsearchtextbox')
      .type('Apple 2024 macbook air de 13 polegadas, chip m3');

    cy.get('#nav-search-submit-button')
      .click();
  });

  it('Comprar', () => {
    cy.visit('https://www.amazon.com.br/s?k=Apple+2024+macbook+air+de+13+polegadas%2C+chip+m3');

    // Tente encontrar o primeiro modelo
    cy.get('h2 a span')
      .contains('Apple 2024 MacBook Air (de 13 polegadas') // Texto mais genérico
      .then(($element) => {
        if ($element.length) {
          cy.wrap($element).click();
        } else {
          // Tente um modelo alternativo
          cy.get('h2 a span')
            .contains('Apple 2024 MacBook Air') // Texto ainda mais genérico
            .first() // Pega o primeiro modelo
            .click({ timeout: 10000 }); // Aumenta o timeout para 10 segundos
        }
      });

    // Clica no botão de compra
    cy.get('#buy-now-button').click();
  });

});

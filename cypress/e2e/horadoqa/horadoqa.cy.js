describe('Hora do QA', () => {
  
  it('Acessando a página de testes do Hora do QA', () => {
    cy.visit('https://horadoqa.github.io/site/testes/');

    // Choose your favorite tool
    cy.get('#select-itens').select('Cypress');

    // Tell us something about your choose
    cy.get('#area').type('Test. Automate. Accelerate /n With Cypress, you can easily create tests for your modern web applications, debug them visually, and automatically run them in your continuous integration builds.')
    
    // Fill in your details
    cy.get('#fname').type('Ricardo Fahham');
    cy.get('#email').type('horadoqa@gmail.com');
    cy.get('#phone').type('+55211234567890');
    cy.get('#country').select('brasil');
  
    // submit the form
    cy.get('#submit-button').click();
  })

  it('Validate', () => {
    
    cy.visit('https://horadoqa.github.io/site/testes/thank.html')
    cy.get('h1').should('have.text', 'Thank you for your participation!')

  });

})
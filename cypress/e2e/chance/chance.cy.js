const Chance = require('chance');
const chance = new Chance();

describe('Testes com Chance.js e Cypress', () => {
  it('Preencher um formulário com dados aleatórios', () => {
    // Gera um nome aleatório
    const nomeAleatorio = chance.name();

    // Gera um e-mail aleatório
    const emailAleatorio = chance.email();

    // Gera um telefone aleatório
    const telefoneAleatorio = chance.phone();

    // Acessa a página do formulário
    cy.visit('https://horadoqa.github.io/site/testes/');

    // Preenche o formulário com os dados aleatórios gerados
    cy.get('#select-itens').select('item-2');
    cy.get('textarea[name="area"]').type('With Cypress, you can easily create tests for your modern web applications, debug them visually, and automatically run them in your continuous integration builds.');
    cy.get('#name').type(nomeAleatorio);
    cy.get('#email').type(emailAleatorio);
    cy.get('#phone').type(telefoneAleatorio);

    // Select Your Country
    cy.get('#country').select('usa');

    // Submete o formulário
    cy.get('#submit-button').click();

    // Verifica se a confirmação de envio do formulário aparece
    cy.contains('Bem-vindo').should('be.visible');
  });
});

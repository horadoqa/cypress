// cypress/integration/chance_example_spec.js

// Importa a biblioteca Chance.js
const Chance = require('chance');
const chance = new Chance();

describe('Testes com Chance.js e Cypress', () => {
  it('Preencher um formulário com dados aleatórios', () => {
    // Gera um nome aleatório
    const nomeAleatorio = chance.name();

    // Gera um e-mail aleatório
    const emailAleatorio = chance.email();

    // Gera um endereço aleatório
    const enderecoAleatorio = chance.address();

    // Acessa a página do formulário
    cy.visit('https://exemplo.com/formulario');

    // Preenche o formulário com os dados aleatórios gerados
    cy.get('input[name="nome"]').type(nomeAleatorio);
    cy.get('input[name="email"]').type(emailAleatorio);
    cy.get('textarea[name="endereco"]').type(enderecoAleatorio);

    // Submete o formulário
    cy.get('button[type="submit"]').click();

    // Verifica se a confirmação de envio do formulário aparece
    cy.contains('Formulário enviado com sucesso!').should('be.visible');
  });
});

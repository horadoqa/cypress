const options = { viewportWidth: 1024, viewportHeight: 768 };

describe('malu', options, () => {
  beforeEach(() => cy.visit('./cypress/e2e/download/1/index.html'));

  it('Acessando o site', () => {
    // Clicando no link de download pelo ID
    cy.get('#download').click({ force: true });

    // Aguardando um pequeno tempo para garantir que o download comece
    cy.wait(1000); // Espera 1 segundo, ajuste conforme necessário

    // Verificando a existência do arquivo baixado
    cy.readFile('./cypress/downloads/exemplo.txt').should('be.equal', 'What is Lorem Ipsum')
  });
});

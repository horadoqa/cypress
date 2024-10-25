const options = { viewportWidth: 1024, viewportHeight: 768 };

describe('malu', options, () => {
  beforeEach(() => cy.visit('https://ri.magazineluiza.com.br'));

  it('Acessando o site', () => {
      cy.get('form').contains('Informações Financeiras').click({ force: true });

      // Aguardando o botão ser visível antes de clicar
      cy.get('button').contains('Informações Financeiras').should('be.visible').click({ force: true });

      // Aguardando o item da lista ser visível antes de clicar
      cy.get('li').contains('Planilha de Resultado').should('be.visible').click({ force: true });

      // Aguardando o elemento estar disponível na nova página
      cy.get('#nWop18R\\/fOmOQtdlfZSqsA\\=\\=')
        .should('exist') // Verifica se o elemento existe no DOM
        .and('be.visible') // Verifica se o elemento está visível
        .click({ force: true }); // Força o clique no elemento

      cy.readFile('./cypress/downloads/RESULTADO_2T24_POR_vf.xlsx').should('exist'); // Verifica a existência do arquivo
  });

});

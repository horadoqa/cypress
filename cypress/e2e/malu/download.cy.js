const options = { viewportWidth: 1024, viewportHeight: 768 };

describe('malu', options, () => {
   it('Download', () => {
        // Visita a nova URL
        cy.visit('https://ri.magazineluiza.com.br/ShowCanal/Planilha-de-Resultado?=CHN0/Z4bUSgrS8IkQeL+Wg==&linguagem=pt');

        // Aguardando o elemento estar disponível na nova página
        cy.get('#nWop18R\\/fOmOQtdlfZSqsA\\=\\=')
        // cy.get('#printLink')
        .should('exist') // Verifica se o elemento existe no DOM
        .and('be.visible') // Verifica se o elemento está visível
        .click({ force: true }); // Força o clique no elemento

        cy.readFile('./cypress/downloads/RESULTADO_2T24_POR_vf.xlsx') // Verifica a existência do arquivo
    });
});

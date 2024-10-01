describe('Acessar site do Youtube', () => {
    
    it('Acessar o site e buscar um vídeo', () => {
        cy.visit('https://www.youtube.com');

        // Aguarda o campo de busca e realiza a busca
        cy.get('input#search', { timeout: 15000 })
          .type('Positive Jazz - Smooth Piano Jazz Music & Relaxing September Bossa Nova instrumental for Good mood{enter}');

        // Aguarda o carregamento dos resultados
        cy.get('ytd-video-renderer', { timeout: 15000 }).should('exist');

        // Clica no primeiro vídeo da lista de resultados
        cy.get('ytd-video-renderer').first().click();

        // Aguarda o carregamento do título do vídeo
        cy.get('h1.title.style-scope.ytd-video-primary-info-renderer', { timeout: 15000 })
          .should('exist'); // Verifica se o título existe

        // Verifica se o texto esperado está presente no título
        cy.get('yt-formatted-string.style-scope.ytd-video-renderer')
          .should('contain.text', 'Positive Jazz - Smooth Piano Jazz Music & Relaxing September Bossa Nova instrumental for Good mood')
          .first().click();
    });

});

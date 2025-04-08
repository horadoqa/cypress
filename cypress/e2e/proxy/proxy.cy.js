describe('Exemplo de Proxy no Cypress', () => {
    it('Deve interceptar uma requisição e redirecioná-la', () => {
        
        // Intercepta a requisição para a URL especificada
        cy.intercept('GET', 'https://api.exemplo.com/**', (req) => {
            // Modifique a requisição ou redirecione para um servidor proxy
            req.continue((res) => {
                // Manipule a resposta se necessário
                res.body = { message: 'Nova resposta via proxy' };
            });
        }).as('requisiçãoProxy');

        // Agora, você pode continuar com a navegação ou qualquer ação necessária
        cy.visit('https://www.sua-aplicacao.com');

        // Aguarde pela requisição interceptada
        cy.wait('@requisiçãoProxy').then((interceptedRequest) => {
            // Verifique a requisição interceptada
            expect(interceptedRequest.response.body.message).to.equal('Nova resposta via proxy');
        });
    });
});
// cypress/e2e/observable.spec.js
describe('Com Observabilidade', () => {
  
  beforeEach(() => {
    // Interceptar TODAS as requisições
    cy.intercept('**', (req) => {
      const inicio = Date.now();
      
      req.reply((res) => {
        const latency = Date.now() - inicio;
        cy.log(`[API] ${req.method} ${req.url} - ${latency}ms`);
      });
    });
  });
  it('teste seu fluxo normalmente', () => {
    // Agora você vê latência de TODA requisição
    cy.visit('https://seu-app.com');
  });
});

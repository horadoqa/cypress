describe('Análise de Performance', () => {
  it('deve identificar a requisição mais lenta (análise simples)', () => {
    
    let maxLatency = 0;
    let slowestRequest = null;
    
    cy.intercept('**', (req) => {
      const inicioReq = Date.now();
      
      req.reply((res) => {
        const latency = Date.now() - inicioReq;
        
        // Rastrear o mais lento
        if (latency > maxLatency) {
          maxLatency = latency;
          slowestRequest = {
            url: req.url,
            method: req.method,
            latency
          };
        }
      });
    });
    
    cy.visit('https://seu-app.com/checkout');
    
    // Preencher dados
    cy.get('input[name="address"]').type('Rua Teste, 123');
    cy.get('input[name="city"]').type('São Paulo');
    cy.get('input[name="zipcode"]').type('01310-100');
    
    // Validar
    cy.get('button[name="validate"]').click();
    
    // Analisar resultado
    cy.log(`🐢 REQUISIÇÃO MAIS LENTA:`);
    cy.log(`${slowestRequest.method} ${slowestRequest.url}`);
    cy.log(`⏱️  Latência: ${slowestRequest.latency}ms`);
    
    // Se passou de 2s, algo está errado
    if (slowestRequest.latency > 2000) {
      cy.log('⚠️  ALERTA: Uma requisição demorou mais de 2 segundos!');
      cy.log('Investigar: Database? Network? Computação pesada?');
    }
  });
  it('deve comparar performance com expectativa (análise profissional)', () => {
    
    const expectedPerformance = {
      '/api/login': 500,      // Deve demorar < 500ms
      '/api/validate': 1000,  // Deve demorar < 1s
      '/api/checkout': 1500   // Deve demorar < 1.5s
    };
    
    const actualPerformance = {};
    
    cy.intercept('**', (req) => {
      const inicioReq = Date.now();
      
      req.reply((res) => {
        const latency = Date.now() - inicioReq;
        const endpoint = req.url.split('/api/').pop().split('?')[0];
        actualPerformance[`/api/${endpoint}`] = latency;
      });
    });
    
    // Executar cenário
    cy.visit('https://seu-app.com/checkout');
    cy.get('button[name="validate"]').click();
    cy.wait(500);
    
    // Comparar com expectativa
    cy.log('=== ANÁLISE DE CONFORMIDADE ===');
    
    Object.entries(actualPerformance).forEach(([endpoint, actual]) => {
      const expected = expectedPerformance[endpoint];
      
      if (expected) {
        const percentualAcima = ((actual - expected) / expected * 100).toFixed(1);
        const status = actual <= expected ? '✅' : '❌';
        
        cy.log(`${status} ${endpoint}`);
        cy.log(`   Esperado: ${expected}ms | Atual: ${actual}ms | Diferença: ${percentualAcima}%`);
        
        // Falhar se muito acima
        expect(actual).to.be.lessThan(expected * 1.5, `${endpoint} está 50% acima do esperado`);
      }
    });
  });
});
describe('Validar Otimizações', () => {
  it('baseline ANTES da otimização', () => {
    
    const latencyBefore = [];
    
    cy.intercept('POST', '/api/checkout', (req) => {
      const inicio = Date.now();
      req.reply((res) => {
        latencyBefore.push(Date.now() - inicio);
      });
    });
    
    for (let i = 0; i < 5; i++) {
      cy.visit('https://seu-app.com/checkout');
      cy.get('button[name="submit"]').click();
      cy.wait(500);
    }
    
    const avgBefore = latencyBefore.reduce((a, b) => a + b) / latencyBefore.length;
    cy.log(`📊 ANTES: Latência média = ${avgBefore.toFixed(0)}ms`);
    
    // Guardar para comparar depois
    cy.savePerformanceBaseline('checkout', avgBefore);
  });
  // Depois você otimiza o backend (adiciona cache, índice DB, etc)
  // E roda:
  
  it('baseline DEPOIS da otimização', () => {
    
    const latencyAfter = [];
    
    cy.intercept('POST', '/api/checkout', (req) => {
      const inicio = Date.now();
      req.reply((res) => {
        latencyAfter.push(Date.now() - inicio);
      });
    });
    
    for (let i = 0; i < 5; i++) {
      cy.visit('https://seu-app.com/checkout');
      cy.get('button[name="submit"]').click();
      cy.wait(500);
    }
    
    const avgAfter = latencyAfter.reduce((a, b) => a + b) / latencyAfter.length;
    cy.log(`📊 DEPOIS: Latência média = ${avgAfter.toFixed(0)}ms`);
    
    // Comparar
    const improvement = ((1 - avgAfter / avgBefore) * 100).toFixed(1);
    cy.log(`
      🎉 MELHORIA: ${improvement}%
      Antes: ${Math.round(latencyAfter[0])}ms
      Depois: ${Math.round(avgAfter)}ms
    `);
    
    expect(avgAfter).to.be.lessThan(avgBefore);
  });
});
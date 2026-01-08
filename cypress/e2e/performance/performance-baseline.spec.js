describe('Baseline de Performance', () => {
  it('deve medir latência do login (iniciante)', () => {
    
    // Medição simples: quanto tempo demora?
    const inicio = Date.now();
    
    cy.visit('https://seu-app.com/login');
    cy.get('input[name="email"]').type('user@test.com');
    cy.get('input[name="password"]').type('senha123');
    cy.get('button[type="submit"]').click();
    
    cy.url().should('include', '/dashboard');
    
    const duracao = Date.now() - inicio;
    
    cy.log(`⏱️  Login demorou: ${duracao}ms`);
    
    // Assertiva: login deve demorar menos de 5 segundos (iniciante)
    expect(duracao).to.be.lessThan(5000);
  });
  it('deve medir latência com granularidade (intermediário)', () => {
    
    const metricas = {};
    
    // Medir carregamento da página
    const inicioPage = Date.now();
    cy.visit('https://seu-app.com/login');
    metricas.pageLoad = Date.now() - inicioPage;
    cy.log(`📄 Página carregou em: ${metricas.pageLoad}ms`);
    
    // Medir preenchimento de formulário
    const inicioForm = Date.now();
    cy.get('input[name="email"]').type('user@test.com');
    cy.get('input[name="password"]').type('senha123');
    metricas.formFill = Date.now() - inicioForm;
    cy.log(`📝 Formulário preenchido em: ${metricas.formFill}ms`);
    
    // Medir submit
    const inicioSubmit = Date.now();
    cy.get('button[type="submit"]').click();
    cy.url().should('include', '/dashboard');
    metricas.submitAndRedirect = Date.now() - inicioSubmit;
    cy.log(`✓ Submit levou: ${metricas.submitAndRedirect}ms`);
    
    // Breakdown total
    const total = metricas.pageLoad + metricas.formFill + metricas.submitAndRedirect;
    cy.log(`
      === BREAKDOWN ===
      Page Load: ${metricas.pageLoad}ms
      Form Fill: ${metricas.formFill}ms
      Submit: ${metricas.submitAndRedirect}ms
      TOTAL: ${total}ms
    `);
    
    // Validar cada etapa tem limite razoável
    expect(metricas.pageLoad).to.be.lessThan(2000);
    expect(metricas.submitAndRedirect).to.be.lessThan(1500);
  });
  it('deve medir com interceptação de API (avançado)', () => {
    
    const apiMetrics = [];
    
    cy.intercept('**', (req) => {
      const inicioReq = Date.now();
      
      req.reply((res) => {
        const latency = Date.now() - inicioReq;
        apiMetrics.push({
          method: req.method,
          url: req.url,
          latency_ms: latency,
          status: res.statusCode
        });
        
        cy.log(`[API] ${req.method} ${req.url.split('/').pop()} → ${latency}ms`);
      });
    });
    
    cy.visit('https://seu-app.com/login');
    cy.get('input[name="email"]').type('user@test.com');
    cy.get('input[name="password"]').type('senha123');
    cy.get('button[type="submit"]').click();
    cy.url().should('include', '/dashboard');
    
    // Analisar métricas
    cy.log('=== DETALHES DE CADA REQUISIÇÃO ===');
    apiMetrics.forEach(metric => {
      cy.log(`${metric.method} - ${metric.latency_ms}ms (status ${metric.status})`);
    });
    
    // Identificar outliers
    const avgLatency = apiMetrics.reduce((acc, m) => acc + m.latency_ms, 0) / apiMetrics.length;
    const outliers = apiMetrics.filter(m => m.latency_ms > avgLatency * 2);
    
    if (outliers.length > 0) {
      cy.log('⚠️  OUTLIERS DETECTADOS:');
      outliers.forEach(o => {
        cy.log(`${o.method} ${o.url} → ${o.latency_ms}ms (esperado ~${avgLatency.toFixed(0)}ms)`);
      });
    }
  });
});
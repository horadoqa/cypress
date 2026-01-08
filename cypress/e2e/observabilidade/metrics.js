// cypress/plugins/metrics.js
// Sistema simples de métricas (em produção, use Prometheus)
class MetricsCollector {
  constructor() {
    this.metrics = {
      test_requests: {},
      request_latency: [],
      test_status: {}
    };
  }
  recordRequest(endpoint, status, latency) {
    const key = `${endpoint}_${status}`;
    this.metrics.test_requests[key] = (this.metrics.test_requests[key] || 0) + 1;
    this.metrics.request_latency.push({ endpoint, latency, status });
  }
  recordTestStatus(testName, status) {
    const key = `${testName}_${status}`;
    this.metrics.test_status[key] = (this.metrics.test_status[key] || 0) + 1;
  }
  getMetrics() {
    return {
      total_requests: Object.values(this.metrics.test_requests).reduce((a, b) => a + b, 0),
      avg_latency: this.calculateAvgLatency(),
      requests_breakdown: this.metrics.test_requests,
      test_status: this.metrics.test_status
    };
  }
  calculateAvgLatency() {
    if (this.metrics.request_latency.length === 0) return 0;
    const sum = this.metrics.request_latency.reduce((acc, item) => acc + item.latency, 0);
    return (sum / this.metrics.request_latency.length).toFixed(3);
  }
}
module.exports = new MetricsCollector();
// cypress/e2e/pagamento.spec.js
const metrics = require('../plugins/metrics');
describe('Testes de Pagamento com Métricas', () => {
  it('deve processar pagamento e coletar métricas', () => {
    
    const inicioTest = Date.now();
    cy.visit('https://seu-app.com/checkout');
    
    // Simular coleta de latência de API
    cy.intercept('POST', '/api/pagamento', (req) => {
      const inicioReq = Date.now();
      
      req.reply((res) => {
        const latency = Date.now() - inicioReq;
        metrics.recordRequest('/api/pagamento', 'success', latency);
        
        cy.log(`[MÉTRICA] POST /api/pagamento - ${latency}ms`);
      });
    }).as('pagamento');
    // Preencher dados de pagamento
    cy.get('input[name="cardNumber"]').type('4111111111111111');
    cy.get('input[name="expiryDate"]').type('12/25');
    cy.get('input[name="cvv"]').type('123');
    
    // Processar pagamento
    cy.get('button[type="submit"]').click();
    cy.wait('@pagamento');
    // Verificar sucesso
    cy.get('.success-message').should('be.visible');
    
    const duracaoTotal = Date.now() - inicioTest;
    metrics.recordTestStatus('pagamento', 'passed');
    cy.log(`[MÉTRICA] Teste concluído em ${duracaoTotal}ms`);
  });
  it('deve gerar relatório de métricas após todos os testes', () => {
    
    const metricas = metrics.getMetrics();
    
    cy.log('=== RELATÓRIO DE MÉTRICAS ===');
    cy.log(`Total de Requisições: ${metricas.total_requests}`);
    cy.log(`Latência Média: ${metricas.avg_latency}ms`);
    cy.log(`Distribuição: ${JSON.stringify(metricas.requests_breakdown)}`);
    cy.log(`Status Testes: ${JSON.stringify(metricas.test_status)}`);
    // Você pode enviar isso para um serviço externo
    cy.request('POST', 'http://localhost:3000/metrics', metricas).then((response) => {
      expect(response.status).to.eq(200);
      cy.log('✓ Métricas enviadas com sucesso');
    });
  });
});
// cypress/support/tracing.js
class RequestTracer {
  constructor() {
    this.traces = [];
    this.currentTraceId = null;
  }
  startTrace(traceId) {
    this.currentTraceId = traceId;
    this.traces.push({
      traceId,
      startTime: Date.now(),
      spans: []
    });
  }
  recordSpan(spanName, duration, details = {}) {
    const trace = this.traces.find(t => t.traceId === this.currentTraceId);
    if (trace) {
      trace.spans.push({
        name: spanName,
        duration_ms: duration,
        timestamp: new Date().toISOString(),
        ...details
      });
    }
  }
  getTrace(traceId) {
    return this.traces.find(t => t.traceId === traceId);
  }
}
const tracer = new RequestTracer();
// cypress/e2e/checkout_trace.spec.js
describe('Checkout com Tracing Distribuído', () => {
  it('deve rastrear fluxo completo de compra', () => {
    
    const traceId = 'trace-' + Date.now();
    tracer.startTrace(traceId);
    // SPAN 1: Carregar página
    const t1 = Date.now();
    cy.visit('https://seu-app.com/checkout');
    tracer.recordSpan('page_load', Date.now() - t1, { page: 'checkout' });
    // SPAN 2: Carregar carrinho
    const t2 = Date.now();
    cy.get('.cart-items').should('be.visible');
    tracer.recordSpan('load_cart', Date.now() - t2, { items: 3 });
    // SPAN 3: Preencher endereço
    const t3 = Date.now();
    cy.get('input[name="address"]').type('Rua Teste, 123');
    cy.get('input[name="city"]').type('São Paulo');
    cy.get('input[name="zipcode"]').type('01310-100');
    tracer.recordSpan('fill_address', Date.now() - t3, { country: 'BR' });
    // SPAN 4: Validar endereço (chamada API)
    const t4 = Date.now();
    cy.intercept('POST', '/api/validate-address').as('validateAddress');
    cy.get('button[name="next"]').click();
    cy.wait('@validateAddress');
    tracer.recordSpan('validate_address', Date.now() - t4, { status: 'valid' });
    // SPAN 5: Preencher pagamento
    const t5 = Date.now();
    cy.get('input[name="cardNumber"]').type('4111111111111111');
    cy.get('input[name="expiryDate"]').type('12/25');
    cy.get('input[name="cvv"]').type('123');
    tracer.recordSpan('fill_payment', Date.now() - t5, { method: 'credit_card' });
    // SPAN 6: Processar pagamento
    const t6 = Date.now();
    cy.intercept('POST', '/api/payment').as('payment');
    cy.get('button[name="confirm"]').click();
    cy.wait('@payment');
    tracer.recordSpan('process_payment', Date.now() - t6, { amount: '99.99' });
    // SPAN 7: Confirmação
    const t7 = Date.now();
    cy.get('.order-confirmed').should('be.visible');
    tracer.recordSpan('confirmation', Date.now() - t7, { status: 'success' });
    // Visualizar trace completo
    const trace = tracer.getTrace(traceId);
    cy.log('=== TRACE DISTRIBUÍDO ===');
    cy.log(JSON.stringify(trace, null, 2));
    // Analisar cada span
    let totalTime = 0;
    trace.spans.forEach(span => {
      cy.log(`${span.name}: ${span.duration_ms}ms`);
      totalTime += span.duration_ms;
    });
    
    cy.log(`⏱️  TEMPO TOTAL: ${totalTime}ms`);
  });
});
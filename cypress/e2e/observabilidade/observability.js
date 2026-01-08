// cypress/support/observability.js
// 
const sendToDatadog = (event) => {
  const payload = {
    timestamp: Date.now(),
    service: 'qa-automation',
    environment: 'staging',
    ...event
  };
  cy.request({
    method: 'POST',
    url: 'https://http-intake.logs.datadoghq.com/api/v2/logs',
    headers: {
      'DD-API-KEY': Cypress.env('DATADOG_API_KEY'),
      'Content-Type': 'application/json'
    },
    body: payload,
    failOnStatusCode: false
  });
};
// Use assim:
// sendToDatadog({ event: 'test_started', test_name: 'login' });
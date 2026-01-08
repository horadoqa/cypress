// cypress/e2e/login.spec.js
describe('Login com Observabilidade', () => {
  
  // Função auxiliar para logs estruturados
  const logEvent = (event, data) => {
    const log = {
      timestamp: new Date().toISOString(),
      event,
      ...data
    };
    
    cy.log(JSON.stringify(log));
    // Em produção, enviar para ELK Stack, Datadog, etc
    console.log(JSON.stringify(log));
  };
  it('deve fazer login com rastreabilidade completa', () => {
    
    // Log do início
    logEvent('test_started', {
      test_name: 'login',
      user_id: 'test-user-123',
      environment: 'staging'
    });
    const inicio = Date.now();
    cy.visit('https://seu-app.com/login');
    
    logEvent('page_loaded', {
      url: 'https://seu-app.com/login',
      duration_ms: Date.now() - inicio
    });
    // Preencher email
    cy.get('input[name="email"]').type('user@test.com');
    logEvent('email_filled', {
      email: 'user@test.com'
    });
    // Preencher senha
    cy.get('input[name="password"]').type('senha123');
    logEvent('password_filled', {
      password_length: 8
    });
    // Clicar login
    const inicioLogin = Date.now();
    cy.get('button[type="submit"]').click();
    
    logEvent('login_clicked', {
      timestamp: new Date().toISOString()
    });
    // Aguardar redirecionamento
    cy.url().should('include', '/dashboard');
    
    const duracaoLogin = (Date.now() - inicioLogin) / 1000;
    logEvent('login_completed', {
      duration_seconds: duracaoLogin.toFixed(3),
      status: 'success'
    });
    // Verificar dashboard
    cy.get('#dashboard').should('be.visible');
    
    const duracaoTotal = (Date.now() - inicio) / 1000;
    logEvent('test_passed', {
      test_name: 'login',
      total_duration_seconds: duracaoTotal.toFixed(3)
    });
  });
  it('deve logar erro de login inválido', () => {
    
    logEvent('test_started', {
      test_name: 'invalid_login',
      user_id: 'test-user-456'
    });
    cy.visit('https://seu-app.com/login');
    
    cy.get('input[name="email"]').type('wrong@email.com');
    cy.get('input[name="password"]').type('wrongpassword');
    
    const inicioLogin = Date.now();
    cy.get('button[type="submit"]').click();
    // Aguardar mensagem de erro
    cy.get('.error-message').should('contain', 'Email ou senha inválidos');
    
    const duracao = (Date.now() - inicioLogin) / 1000;
    
    logEvent('invalid_login_handled', {
      duration_seconds: duracao.toFixed(3),
      error_message: 'Email ou senha inválidos',
      status: 'expected_failure'
    });
  });
});
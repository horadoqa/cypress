describe('Automação de tela de login', () => {
  
  it('Deve testar o fluxo de login com diferentes entradas', () => {
  
  // 1 - Abrir o site
  // cy.visit('https://horadoqa.github.io/site/testes')
  cy.visit('https://testetacola.netlify.app');
  cy.log('Resultado esperado: O site deve ser aberto corretamete');

  // 2 - Clicar no botão "Entrar sem preencher os campos"
  cy.wait(1000);
  cy.get('button').contains('Entrar').click();
  cy.log('Resultado esperado: Falha de login e emensagem de erro exibida');

  // 3 - Preencher o campo de e-mail com um e-mail inválido e tentar entrar
  cy.wait(1000);
  cy.get('input#username').type('emailinvalido@exemplo');
  cy.wait(1000);
  cy.get('button').contains('Entrar').click();
  cy.log('Resultado esperado: Falha de login e mensagem de erro exibida');

  // 4 - Preencher o campo de senha com uma senha inválida e tentar entrar
  cy.wait(1000);
  cy.get('input#password').type('senhainvalida');
  cy.wait(1000);
  cy.get('button').contains('Entrar').click();
  cy.log('Resultado esperado: Falha de login e mensagem de erro exibida');

  // 5 - Apagar o campo de e-mail e tentar entrar
  cy.wait(1000);
  cy.get('input#username').clear();
  cy.wait(1000);
  cy.get('button').contains('Entrar').click();
  cy.log('Resultado esperado: Falha de login e mensagem de erro exibida');

  // 6 - Colocar um e-mail válido e tentar entrar
  cy.wait(1000);
  cy.get('input#username').type('yagotacola@examplo.com');
  cy.wait(1000);
  cy.get('button').contains('Entrar').click();
  cy.log('Resultado esperado: Falha de login e mensagem de erro exibida');

  // 7 - Apagar a senha, inserir uma senha válida e tentar entrar 
  cy.wait(1000);
  cy.get('input#password').clear().type('yagotacola');
  cy.wait(1000);
  cy.get('button').contains('Entrar').click();
  cy.log('Resultado esperado: Sucesso no Login');
  })

  // 8 - Validação do Login

  
})
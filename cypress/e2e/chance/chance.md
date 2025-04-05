# O **Chance.js** 

É uma biblioteca que gera dados aleatórios, como números, nomes, endereços e outros tipos de informações, sendo útil em testes automatizados. Quando usado com **Cypress**, ele pode ajudar a gerar dados dinâmicos durante a execução dos testes.

Aqui está um exemplo de como você pode configurar um teste no Cypress utilizando o **Chance.js**:

1. **Instale o Chance.js**:

Primeiro, instale o **Chance.js** no seu projeto. Se você não tiver o Cypress instalado, instale-o também.

```bash
npm install chance cypress --save-dev
```

2. **Exemplo de código**:

Aqui está um exemplo de como usar o **Chance.js** no Cypress para gerar dados aleatórios em um teste.

```javascript
const Chance = require('chance');
const chance = new Chance();

describe('Testes com Chance.js e Cypress', () => {
  it('Preencher um formulário com dados aleatórios', () => {
    // Gera um nome aleatório
    const nomeAleatorio = chance.name();

    // Gera um e-mail aleatório
    const emailAleatorio = chance.email();

    // Gera um telefone aleatório
    const telefoneAleatorio = chance.phone();

    // Gera um endereço aleatório
    const enderecoAleatorio = chance.address();

    // Acessa a página do formulário
    cy.visit('https://horadoqa.github.io/site/testes/');

    // Preenche o formulário com os dados aleatórios gerados
    cy.get('#select-itens').select('item-2');
    cy.get('textarea[name="area"]').type('With Cypress, you can easily create tests for your modern web applications, debug them visually, and automatically run them in your continuous integration builds.');
    cy.get('#name').type(nomeAleatorio);
    cy.get('#email').type(emailAleatorio);
    cy.get('#phone').type(telefoneAleatorio);

    // Select Your Country
    cy.get('#country').select('usa');

    // Submete o formulário
    cy.get('#submit-button').click();

    // Verifica se a confirmação de envio do formulário aparece
    cy.contains('Bem-vindo').should('be.visible');
  });
});

```

### Explicação:

- **Importação do Chance.js**: No começo do arquivo, o Chance.js é importado e instanciado. Isso permite gerar dados aleatórios dentro dos testes.
  
- **Geração de dados aleatórios**: Usamos o `chance.name()`, `chance.email()` e `chance.address()` para gerar um nome, e-mail e endereço aleatórios.

- **Cypress**: Usamos o Cypress para automatizar o preenchimento de um formulário e fazer as verificações necessárias.

### Como executar o teste:

Para executar este teste, basta rodar o comando:

```bash
npx cypress open
```

E então, você pode visualizar o teste sendo executado no Cypress Test Runner.

Esse é apenas um exemplo básico de como você pode combinar o **Chance.js** com o Cypress. Você pode adaptar e expandir isso conforme as necessidades do seu projeto, gerando diferentes tipos de dados para diferentes cenários de teste.
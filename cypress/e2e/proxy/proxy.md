# Proxy

No **Cypress**, o uso de um **proxy** pode ser útil para modificar requisições HTTP ou interceptar tráfego de rede durante a execução dos testes. O Cypress possui uma funcionalidade chamada **`cy.intercept()`**, que permite interceptar e modificar requisições e respostas HTTP.

Para configurar um proxy no Cypress, você pode usar o **Cypress Proxy** ou configurar o `cy.intercept()` para redirecionar as requisições para um servidor proxy.

### 1. **Usando `cy.intercept()` para interceptar e modificar requisições**

Se você quer interceptar uma requisição HTTP e redirecioná-la, por exemplo, para um servidor proxy ou alterar a resposta, pode fazer isso assim:

```javascript
describe('Exemplo de Proxy no Cypress', () => {
  it('Deve interceptar uma requisição e redirecioná-la', () => {
    // Intercepta a requisição para a URL especificada
    cy.intercept('GET', 'https://api.exemplo.com/**', (req) => {
      // Modifique a requisição ou redirecione para um servidor proxy
      req.continue((res) => {
        // Manipule a resposta se necessário
        res.body = { message: 'Nova resposta via proxy' };
      });
    }).as('requisiçãoProxy');

    // Agora, você pode continuar com a navegação ou qualquer ação necessária
    cy.visit('https://www.sua-aplicacao.com');

    // Aguarde pela requisição interceptada
    cy.wait('@requisiçãoProxy').then((interceptedRequest) => {
      // Verifique a requisição interceptada
      expect(interceptedRequest.response.body.message).to.equal('Nova resposta via proxy');
    });
  });
});
```

### 2. **Configuração do Proxy no Cypress (Configuração de Rede)**

Caso você precise que todo o tráfego HTTP do Cypress passe por um servidor proxy (por exemplo, para testes em ambientes com restrições de rede ou bloqueios geográficos), você pode configurar o proxy diretamente nas configurações do Cypress. 

No arquivo `cypress.json`, você pode adicionar configurações para um servidor proxy:

```json
{
  "env": {
    "HTTP_PROXY": "http://proxy:8080",  // Endereço do seu servidor proxy
    "HTTPS_PROXY": "http://proxy:8080" // Para requisições HTTPS
  }
}
```

### 3. **Configurando o Proxy na Linha de Comando**

Se você estiver usando uma linha de comando, pode passar variáveis de ambiente para configurar o proxy da seguinte forma:

```bash
HTTP_PROXY=http://proxy:8080 HTTPS_PROXY=http://proxy:8080 npx cypress open
```

### 4. **Usando o `cypress-plugins` para configurar proxy de forma avançada**

Caso precise de um controle mais avançado de proxies, você pode usar o plugin `cypress-proxy`. Este plugin permite configurar proxies de maneira mais flexível. Para isso, basta instalá-lo:

```bash
npm install --save-dev cypress-proxy
```

Em seguida, você pode configurar o `proxy` no arquivo `plugins/index.js`:

```javascript
const proxy = require('cypress-proxy');

module.exports = (on, config) => {
  on('before:browser:launch', (browser = {}, launchOptions) => {
    if (browser.name === 'chrome') {
      launchOptions.args.push('--proxy-server=http://proxy:8080');
    }
    return launchOptions;
  });

  return config;
};
```

Isso configurará o Cypress para usar um proxy em todas as requisições feitas durante os testes.

### Considerações Finais

- A solução `cy.intercept()` é muito útil para modificar ou interceptar requisições específicas dentro de seus testes.
- Configurar proxies diretamente no ambiente de execução ou via plugins é útil quando você precisa manipular o tráfego de rede globalmente.

Claro! Vou melhorar a estrutura e a clareza da sua documentação, tornando-a mais organizada e com explicações mais detalhadas para facilitar o entendimento de quem for ler. Também vou corrigir alguns pequenos erros e melhorar a formatação.

---

# Testes de API com Cypress

Cypress é uma ferramenta de automação de testes para aplicações web, mas também é excelente para testar APIs, utilizando o comando `cy.request()`. Neste guia, vamos explorar como testar APIs com Cypress, utilizando a API **ServeRest** como exemplo.

### APIs Utilizadas

- **ServeRest**: Uma API REST gratuita que simula uma loja virtual e serve como material de estudos para testes de API. [Acesse aqui](https://serverest.dev/)
- **Typeform**: Uma plataforma que oferece ferramentas para criação de formulários online e outros serviços. [Acesse aqui](https://www.typeform.com/)

---

## Testando a API com o método `GET`

O método `GET` é utilizado para obter informações de um servidor, como, por exemplo, a lista de usuários cadastrados.

### Exemplo: Obter Usuário Inexistente

Este exemplo tenta acessar um usuário com um ID inválido, o que deve retornar um erro 404.

```javascript
describe('Testes API - Usuários', () => {
  const baseUrl = 'https://serverest.dev/usuarios';

  // Listar dados pelo ID
  it('Deve retornar status 404 ao tentar acessar um usuário inexistente', () => {
    const idInvalido = '999999'; // ID de usuário inválido

    cy.request({
      method: 'GET',
      url: `${baseUrl}/${idInvalido}`,
      failOnStatusCode: false  // Impede o Cypress de falhar automaticamente para status >= 400
    }).then((response) => {
      expect(response.status).to.eq(404); // Espera o status 404
    });
  });
});
```

---

## Testando a API com o método `POST`

O método `POST` é utilizado para enviar dados ao servidor, como no caso de criar um novo usuário.

### Exemplo: Cadastrar um Novo Usuário

Este exemplo mostra como cadastrar um novo usuário e verificar se os dados retornados estão corretos.

```javascript
describe('Testes API - Usuários', () => {
  const baseUrl = 'https://serverest.dev/usuarios';

  it('Deve criar um novo usuário com sucesso', () => {
    const novoUsuario = {
      nome: "Hora do QA",
      email: "horadoqa@teste.com",
      password: "1q2w3e4r",
      administrador: "true"
    };

    cy.request({
      method: 'POST',
      url: baseUrl,
      body: novoUsuario,
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((response) => {
      expect(response.status).to.eq(201); // Espera o status 201 (Criado)
      expect(response.body).to.have.property('message', 'Cadastro realizado com sucesso');
      expect(response.body).to.have.property('_id'); // Verifica se existe um _id
    });
  });
});
```

---

## Testando a API com o método `PUT`

O método `PUT` é utilizado para atualizar informações de um recurso existente, como um usuário cadastrado.

### Exemplo: Atualizar Informações de um Usuário

Aqui, você pode criar um teste que altere os dados de um usuário existente. **(Adicionar exemplo de PUT quando necessário)**.

```javascript
describe('Testes API - Usuários', () => {
  const baseUrl = 'https://serverest.dev/usuarios';

  it('Deve atualizar um usuário com sucesso', () => {
    const usuarioAtualizado = {
      nome: "Hora do QA Atualizado",
      email: "horadoqa_atualizado@teste.com",
      password: "2w3e4r5t",
      administrador: "false"
    };

    cy.request({
      method: 'PUT',
      url: `${baseUrl}/1`, // Substituir pelo ID do usuário real
      body: usuarioAtualizado,
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('nome', usuarioAtualizado.nome);
    });
  });
});
```

---

## Testando a API com o método `DELETE`

O método `DELETE` é utilizado para remover um recurso, como a exclusão de um usuário.

### Exemplo: Deletar um Usuário

Aqui, você pode criar um teste para excluir um usuário.

```javascript
describe('Testes API - Usuários', () => {
  const baseUrl = 'https://serverest.dev/usuarios';

  it('Deve deletar um usuário com sucesso', () => {
    cy.request({
      method: 'DELETE',
      url: `${baseUrl}/1`, // Substituir pelo ID real do usuário
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('message', 'Registro excluído com sucesso');
    });
  });
});
```

---

## Tratamento de Erros

Por padrão, o Cypress falha quando uma requisição retorna um status code que não está nas faixas 2xx ou 3xx. Isso é útil para detectar falhas, mas e quando precisamos testar cenários negativos, como erros de autenticação ou recurso não encontrado?

### Desativando a falha automática de status

Para permitir que o Cypress não falhe automaticamente quando o status for 4xx ou 5xx, use a opção `failOnStatusCode: false`.

### Exemplo 1: Requisição Não Autorizada (401)

Esse exemplo testa o comportamento de uma API quando a autenticação falha (ausência de token).

```javascript
it('Fails with 401 (Unauthorized) status code when access token is missing', () => {
  cy.request({
    method: 'GET',
    url: 'https://api.typeform.com/me',
    failOnStatusCode: false, // Impede que o Cypress falhe automaticamente
  }).should(({ status, body }) => {
    expect(status).to.equal(401); // Espera o código de status 401 (não autorizado)
    expect(body).to.include('AUTHENTICATION_FAILED');
  });
});
```

### Exemplo 2: Token de Acesso Incorreto (403)

Esse exemplo testa quando o token de acesso é inválido, resultando em erro 403 (Proibido).

```javascript
it('Fails with 403 (Forbidden) status code when access token is incorrect', () => {
  cy.request({
    method: 'GET',
    url: 'https://api.typeform.com/me',
    headers: { authorization: 'Bearer 0123456789abcdefghijklmnopqrsvwxyz' },
    failOnStatusCode: false,
  }).should(({ status, body }) => {
    expect(status).to.equal(403); // Espera o código de status 403 (proibido)
    expect(body).to.include('AUTHENTICATION_FAILED');
  });
});
```

### Exemplo 3: Recurso Não Encontrado (404)

Este exemplo testa o comportamento quando a URL solicitada não existe, retornando um erro 404.

```javascript
it('Fails with 404 (Not Found) status code when URL does not exist', () => {
  cy.request({
    method: 'GET',
    url: 'https://walmyr.dev/invalid-123',
    failOnStatusCode: false,
  }).should(({ status, statusText }) => {
    expect(status).to.equal(404); // Espera o código de status 404
    expect(statusText).to.equal('Not Found');
  });
});
```

---

## Considerações Finais

Com o Cypress, é possível realizar uma ampla gama de testes de APIs, desde simples requisições GET até testes de erro e autenticação. Não se esqueça de usar a opção `failOnStatusCode: false` para testar cenários negativos sem que o Cypress falhe automaticamente.

Explore diferentes métodos HTTP e cenários para garantir que sua API esteja funcionando corretamente!

---

Se você gostou deste guia, não esqueça de deixar uma estrela ⭐ no repositório ou compartilhar com seus colegas.
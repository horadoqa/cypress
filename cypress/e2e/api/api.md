# Testes de API com Cypress

Com o Cypress, podemos testar APIs utilizando o comando cy.request().

SERVEREST
O ServeRest é uma API REST gratuita que simula uma loja virtual com intuito de servir de material de estudos de testes de API.
https://serverest.dev/

TYPEFORM
Disponibiliza ferramentas para desenvolvimento.
https://www.typeform.com/


## GET

Método para obter a lista de usuários cadastrados:

```javascript
describe('Testes API - Usuários', () => {

    const baseUrl = 'https://serverest.dev/usuarios';
  
    // Listar dados pelo ID
    it('Deve retornar status 404 ao tentar acessar um usuário inexistente', () => {
      const idInvalido = '999999';
      
      cy.request({
        method: 'GET',
        url: `${baseUrl}/${idInvalido}`,
        failOnStatusCode: false  // Impede o Cypress de falhar automaticamente para status >= 400
      }).then((response) => {
        expect(response.status).to.eq(404);
      });
    });
  
  });
```

## POST

Método para Cadastrar um usuário ou realizando o Login

```javascript

```

## PUT

Método para alterr informações do Usuário Cadastrado

```javascript
```

## DELETE

Método para Removr o Usuário do cadastro

```javascript
```

## Tratamento de ERROR

Por padrão, quando uma requisição retorna um código de status que não esteja na faixa dos 200 ou 300, o Cypress falha o teste, conforme demonstrado abaixo.

> This was considered a failure because the status code was not `2xx` or `3xx`.

E aí você se pergunta.

O que fazer quando preciso testar tais cenários negativos?

É exatamente isso que vou demonstrar neste conteúdo. Vem comigo!

Logo abaixo do erro demonstrado acima, o Cypress nos dá outra dica (veja abaixo).

> If you do not want status codes to cause failures pass the option: `failOnStatusCode: false`

Portanto, vejamos alguns exemplos, para tudo ficar mais claro.

Requisição não autorizada

```javascript
it('fails with 401 (Unauthorized) status code when access token is missing', () => {
  cy.request({
    method: 'GET',
    url: 'https://api.typeform.com/me',
    failOnStatusCode: false,
  }).should(({ status, body }) => {
    expect(status).to.equal(401)
    expect(body).includes('AUTHENTICATION_FAILED')
    expect(body)
      .includes('Authentication credentials not found on the Request Headers')
    // Or
    const bodyObj = JSON.parse(body)
    const { code, description } = bodyObj
    expect(code).to.equal('AUTHENTICATION_FAILED')
    expect(description)
      .to.equal('Authentication credentials not found on the Request Headers')
  })
})
```

No teste acima, estou tentando obter minhas informações a partir da API da Typeform, porém, um token de acesso é exigido para que a requisição seja autorizada.

Como tal token não é passado nos headers, a requisição falha com um erro 401 (Unauthorized – Não autorizado(a)).

Para testar tal comportamento, além do método (method) e url, passo ao objeto de options do cy.request() a propriedade failOnStatusCode, com o valor false, o qual evita o erro demonstrardo anteriormente.

Por fim, encadeio ao cy.request() o comando .should() para fazer as verificações de resultado esperado, onde além de verificar que o código de status  é igual a 401, demonstro duas opções para a verificação do body da resposta da requisição.

Na primeira opção de asserções, simplesmente verifico que o body inclui (ou contém) certas strings.

Já na segunda, primeiro transformo o body (de string para JSON) e o armazeno em uma variável; depois, desestruturo de tal objeto as propriedades code e description; e então, verifico que o code é igual a certa string e a description à outra.

Requisição proibida
Vejamos outro exemplo, também para a API da Typeform, onde desta vez, o token de acesso é passado, porém com um valor incorreto.

```javascript
it('fails with 403 (Forbidden) status code when access token is incorrect', () => {
  cy.request({
    method: 'GET',
    url: 'https://api.typeform.com/me',
    headers: { authorization: 'Bearer 0123456789abcdefghijklmnopqrsvwxyz' },
    failOnStatusCode: false,
  }).should(({ status, body }) => {
    expect(status).to.equal(403)
    expect(body).includes('AUTHENTICATION_FAILED')
    expect(body).includes('Authentication failed')
    // Or
    const bodyObj = JSON.parse(body)
    const { code, description } = bodyObj
    expect(code).to.equal('AUTHENTICATION_FAILED')
    expect(description).to.equal('Authentication failed')
  })
})
```

A idéia é a mesma.

Além de passar o método (method), url, header (com um token de acesso incorreto), passo também a propriedade failOnStatusCode como valor false.

Dessa forma, posso novamente encadear um .should(), no qual desestruturo algumas propriedades da resposta da requisição (tais como status e body), para fazer as asserções dos resultados esperados em sua função de callback.

Requisição de recurso não encontrado
Por fim, vejamos um teste para uma requisição que retorna um erro 404 (Not Found), para a url do meu website pessoal.

```javascript
it('fails with 404 (Not Found) status code when url does not exist', () => {
  cy.request({
    method: 'GET',
    url: 'https://walmyr.dev/invalid-123',
    failOnStatusCode: false,
  }).should(({ status, statusText }) => {
    expect(status).to.equal(404)
    expect(statusText).to.equal('Not Found')
  })
})
```

Não há nada de novo, como você já devia estar imaginando.

Ou seja, passando a propriedade failOnStatusCode com o valor false, posso verificar que o status da resposta é 404 e o texto do status é Not Found.

Aproveita pra deixar uma ⭐!

Veja também como o teste é exibido quando falha, falha a qual forcei para fins de demonstração.

PI - Error scenarios
  fails with 401 (Unauthorized) status code when access token is missing:

  AssertionError: expected 401 to equal 200
  + expected - actual

  -401
  +200


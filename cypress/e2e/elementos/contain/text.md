# Buscando por uma palavra específica

html

```bash
<a class="page">Informações Financeiras</a>
```

cypress

```bash
cy.get('a.page').should('contain.text', 'Informações Financeiras');
```

Essse caso deu erro:

```bash
cy.get('a.page').should('have.text', 'Informações 
Financeiras')
```

Timed out retrying after 4000ms: expected '[ <a.page>, 4 more... ]' to have text 'Informações Financeiras', but the text was 'O Magazine LuizaGovernança e SustentabilidadeInformações FinanceirasInformações aos AcionistasContatos'

O erro sugere que o Cypress não conseguiu encontrar o texto exato que você esperava em um elemento na sua página. Esse tipo de erro ocorre quando o Cypress está tentando verificar se um elemento contém um texto específico, mas o texto atual do elemento não corresponde ao que foi esperado.
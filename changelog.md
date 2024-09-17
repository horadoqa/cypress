# CHANGELOG

## Data: 15/09/2024

> ERRO

  1) Site do Alura Cursos
       alura:
     TypeError: The following error originated from your application code, not from Cypress.

  > Cannot read properties of undefined (reading 'push')

  When Cypress detects uncaught errors originating from your application it will automatically fail the current test.

  This behavior is configurable, and you can choose to turn this off by listening to the `uncaught:exception` event.

  https://on.cypress.io/uncaught-exception-from-application

> CORREÇÃO

  https://docs.cypress.io/guides/references/error-messages#Uncaught-exceptions-from-your-application

  https://docs.cypress.io/api/cypress-api/catalog-of-events#Uncaught-Exceptions

  https://docs.cypress.io/guides/core-concepts/writing-and-organizing-tests#Support-file

  Adicionar código abaixo no arquivo: suport/e2e.js

```bash
Cypress.on('uncaught:exception', (err, runnable) => {
      // returning false here prevents Cypress from
      // failing the test
      return false
    })
```
## Data: 

> ERRO


> CORREÇÃO
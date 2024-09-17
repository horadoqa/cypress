# Sleep

Às vezes, o erro ocorre porque o elemento ainda não está totalmente carregado ou atualizado quando o Cypress tenta fazer a verificação. Aumentar o tempo de espera pode ajudar.

```bash
cy.get('a.page', { timeout: 10000 }).should('contain.text', 'Informações Financeiras');
```
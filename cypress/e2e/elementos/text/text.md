# TEXT

## Adicionar

cy.get('#twotabsearchtextbox').type('apple 2024 macbook air de 13 polegadas, chip m3');

## Procurar


cy.get('h1').should('have.text', 'Thank you for your participation!')

cy.get('h3').should('contains.text', 'Cypress: Testing Frameworks for Javascript | Write, Run, Debug')
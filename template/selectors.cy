describe("Open", () => {

    // Resumo dos Seletores:
    // *=; Contém a string em qualquer parte do valor
    // $=: O valor termina com a string especificada.
    // ^=: O  valor começa com a string especificada.
    // |=: O valor é exatamente igual a string ou começa com ela seguida deum hífen
    // O valor contém a string como uma palavra separada por espaços.
  
  it("Dicas input por name", () => {

    // <input type="email" id="username" name="username-login"
    // required="" placeholder="informe seu e-mail" autocomplete="off" value=""</input> 

    cy.get('[name*="name"]'); //contains
    cy.get('[name$="ame"]');  // termina com
    cy.get('[name*="user"]'); // contains
    cy.get('[name^="user"]');  // começa com
    cy.get('[name|="username"]');  // começa com a string
    cy.get('[name~="username"]'); // user username

  });

  it("Dicas input por placeholder", () => {
    
    // <input type="email" id="username" name="username-login"
    // required="" placeholder="informe seu e-mail" autocomplete="off" value=""</input> 

    cy.get('[placeholder*="mail"]'); //contains
    cy.get('[placeholder$="ail"]');  // termina com
    cy.get('[placeholder*="e-"]'); // contains
    cy.get('[placeholder^="inf"]');  // começa com
    cy.get('[placeholder|="informe"]');  // começa com a string
    cy.get('[placeholder~="e-mail"]'); // user username
  
  });
})

describe("Teste de Navegação", () => {
    
    it("Da primeira para a segunda página", () => {
      
      cy.visit("http://127.0.0.1:5500/cypress/e2e/multiplas/index.html");
      cy.contains("Página Inicial").should("exist");
      cy.wait(3000);
      cy.get("#botao-nova-janela").click();
    
    })
    
    it("Da segunda para a terceira página", () => {
      
      cy.visit("http://127.0.0.1:5500/cypress/e2e/multiplas/segunda.html");
      // Assert
      cy.contains("Bem-vindo à Segunda Página").should("exist");
      cy.get('[id="campo-de-texto"]').should("exist").type("Testando");
      cy.wait(300);
      
      // Caso o elemento tenha TARGET, remover para abrir nova página 
      cy.contains("Abrir Terceira Página")
        .invoke("removeAttr", "target")
        .click();

      cy.contains("p", "Essa é a Terceira Página").should("be.visible");

    });
    
     it("Da terceira para a quarta página", () => {
      
      cy.visit("http://127.0.0.1:5500/cypress/e2e/multiplas/terceira.html");
      // Assert
      cy.window().then((win) => {
        cy.stub(win, "open").callsFake((url) => {
          win.location.href = url;
        });
      });
      cy.wait(300);
      cy.contains("Abrir nova janela").click();

     });

     it("Validando a Quarta página", () => {
      
      cy.visit("http://127.0.0.1:5500/cypress/e2e/multiplas/quarta.html");
      cy.contains("Bem-Vindo à Quarta Página").should("be.visible");
      cy.wait(300);
     
    });
});
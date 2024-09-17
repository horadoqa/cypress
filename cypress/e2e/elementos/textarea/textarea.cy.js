describe('Escrever texto em um textarea', () => {
    
    it('Deve escrever um texto dentro de um textarea', () => {
      cy.visit('your_page_url'); // Substitua pela URL da sua página
  
      // Seleciona o <textarea> pelo ID e escreve o texto desejado
      cy.get('#comentario').type('Este é um exemplo de texto.');
  
      // Verifica se o texto foi inserido corretamente
      cy.get('#comentario').should('have.value', 'Este é um exemplo de texto.');
    });

    it('Deve adicionar texto ao final do texto existente', () => {
        cy.visit('your_page_url'); // Substitua pela URL da sua página
    
        // Primeiro escreve algum texto no <textarea>
        cy.get('#comentario').type('Texto inicial.');
    
        // Adiciona mais texto ao final
        cy.get('#comentario').type(' Texto adicional.', { delay: 0 });
    
        // Verifica se o texto foi adicionado corretamente
        cy.get('#comentario').should('have.value', 'Texto inicial. Texto adicional.');
      });

      it('Deve apagar o texto existente e escrever um novo texto', () => {
        cy.visit('your_page_url'); // Substitua pela URL da sua página
    
        // Primeiro escreve algum texto no <textarea>
        cy.get('#comentario').type('Texto existente.');
    
        // Seleciona todo o texto existente e substitui com novo texto
        cy.get('#comentario').type('{selectall}{del}Novo texto.', { delay: 0 });
    
        // Verifica se o texto foi substituído corretamente
        cy.get('#comentario').should('have.value', 'Novo texto.');
      });

      it('Deve limpar o texto existente e digitar um novo texto', () => {
        cy.visit('your_page_url'); // Substitua pela URL da sua página
    
        // Seleciona o <textarea>, limpa o texto existente e escreve novo texto
        cy.get('#comentario').clear().type('Texto limpo e novo.');
    
        // Verifica se o texto foi inserido corretamente
        cy.get('#comentario').should('have.value', 'Texto limpo e novo.');
      });
  });
  
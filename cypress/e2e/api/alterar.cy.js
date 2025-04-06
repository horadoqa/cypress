describe('Testes API - Usuários', () => {

    const baseUrl = 'https://serverest.dev/usuarios';
  
    // Atualiza as informações de um usuário existente e verifica se a resposta retorna com o status 200
    it('Deve atualizar as informações de um usuário', () => {
      const idExistente = 'XNImm8eXee3TeggM'; // Substitua com um ID válido de um usuário existente
      const usuarioAtualizado = {
        nome: "Hora do QA Atualizado",
        email: "horadoqa@teste.com",
        password: "1q2w3e4r",
        administrador: "true"
      };
  
      cy.request({
        method: 'PUT',
        url: `${baseUrl}/${idExistente}`,
        body: usuarioAtualizado,
        headers: {
          'Content-Type': 'application/json'
        }
      }).then((response) => {
        // Verifique as propriedades do corpo da resposta
        expect(response.body).to.have.property('message', 'Registro alterado com sucesso');
        cy.log('Registro Alterado:', JSON.stringify(response.body, null, 2)); // Exibe a resposta no log do Cypress
      });
    });
  
  });
  
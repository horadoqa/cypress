describe('Testes API - Usuários', () => {

    const baseUrl = 'https://serverest.dev/usuarios';
  
    it('Deve atualizar as informações de um usuário', () => {
      const idExistente = ''; 
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
        expect(response.body).to.have.property('message', 'Registro alterado com sucesso');
        cy.log('Registro Alterado:', JSON.stringify(response.body, null, 2));
      });
    });
  
  });
  
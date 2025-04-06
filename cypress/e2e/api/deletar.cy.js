describe('Testes API - Usuários', () => {

    const baseUrl = 'https://serverest.dev/usuarios';
    
    // Deleta um usuário e verifica se a resposta contém a mensagem de sucesso.
    it('Deve deletar um usuário com sucesso', () => {
      // Substitua com um ID válido de um usuário existente
      const idExistente = 'XNImm8eXee3TeggM'; 
  
      cy.request({
        method: 'DELETE',
        url: `${baseUrl}/${idExistente}`
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('message', 'Registro excluído com sucesso');
      });
    });
  
  });
  
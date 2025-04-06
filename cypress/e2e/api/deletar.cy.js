describe('Testes API - Usuários', () => {

    const baseUrl = 'https://serverest.dev/usuarios';
    
    it('Deve deletar um usuário com sucesso', () => {
      const idExistente = ''; 
  
      cy.request({
        method: 'DELETE',
        url: `${baseUrl}/${idExistente}`
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('message', 'Registro excluído com sucesso');
      });
    });
  
  });
  
describe('Testes API - Usuários', () => {

    const baseUrl = 'https://serverest.dev/usuarios';
  
    //Testa se a rota de listagem de usuários retorna um status 200 e se a resposta contém um array de usuários.
    it('Deve retornar status 200 ao acessar a rota GET', () => {
      cy.request({
        method: 'GET',
        url: baseUrl
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('usuarios');
        expect(response.body.usuarios).to.be.an('array');
      });
    });
  
});
  
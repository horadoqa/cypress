describe('Testes API - Usuários', () => {

    const baseUrl = 'https://serverest.dev/login';
  
    it('Deve realizar o Login do usuário com sucesso', () => {
      const Usuario = {
        email: "horadoqa@teste.com",
        password: "1q2w3e4r"
      };
  
      cy.request({
        method: 'POST',
        url: baseUrl,
        body: Usuario,
        headers: {
          'Content-Type': 'application/json'
        }
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('message', 'Login realizado com sucesso');
        cy.log('Resposta completa:', JSON.stringify(response.body, null, 2));
      });
    });

  });
  
describe('Testes API - Usuários', () => {

    const baseUrl = 'https://serverest.dev/usuarios';
  
    // Envia uma requisição para criar um novo usuário e verifica se o status é 201, que indica que o recurso foi criado com sucesso.
    it('Deve criar um novo usuário com sucesso', () => {
      const novoUsuario = {
        nome: "Hora do QA",
        email: "horadoqa@teste.com",
        password: "1q2w3e4r",
        administrador: "true"
      };
  
      cy.request({
        method: 'POST',
        url: baseUrl,
        body: novoUsuario,
        headers: {
          'Content-Type': 'application/json'
        }
      }).then((response) => {
        expect(response.status).to.eq(201);
        expect(response.body).to.have.property('message', 'Cadastro realizado com sucesso');
        // expect(response.body).to.have.property('_id').that.is.not.empty;
        // xpect(response.body).to.have.property('_id').that.is.a('string')
        // expect(response.body).to.have.property('_id').that.is.a('string').and.is.not.empty;
      });
    });

  });
  
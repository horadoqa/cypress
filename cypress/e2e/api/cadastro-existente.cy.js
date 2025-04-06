describe('Testes API - Usuários', () => {

    const baseUrl = 'https://serverest.dev/usuarios';
  
    // Envia uma requisição para criar um novo usuário e verifica se o status é 201, que indica que o recurso foi criado com sucesso.
    it('Deve receber a informação que usuári já está cadastrado, retornando Status Code 400', () => {
      const novoUsuario = {
        nome: "Hora do QA",
        email: "horadoqa@teste.com",
        password: "1q2w3e4r",
        administrador: "true"
      };
  
      cy.request({
        method: 'POST',
        url: baseUrl,
        failOnStatusCode: false, // passando a propriedade failOnStatusCode com o valor false, posso verificar que o status da resposta é 400 e o texto do status é Bad Request.
        body: novoUsuario,
        headers: {
          'Content-Type': 'application/json'
        }
      }).then((response) => {
        expect(response.status).to.eq(400);
        expect(response.body).to.have.property('message', 'Este email já está sendo usado');
      });
    });

  });
  
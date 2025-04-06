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
        // Verifique se a resposta contém o status 201
        expect(response.status).to.eq(201);
        
        // Verifique as propriedades do corpo da resposta
        expect(response.body).to.have.property('message', 'Cadastro realizado com sucesso');
        
        // Acesse e verifique o _id
        const userId = response.body._id;
        expect(userId).to.exist; // Verifica se o _id existe
        
        // Log para visualizar o _id no console
        console.log('ID do novo usuário:', userId);
  
        // Você pode fazer qualquer outra asserção aqui, por exemplo:
        expect(userId).to.be.a('string'); // Verifique se o _id é uma string
      });
    });
  
  });
  
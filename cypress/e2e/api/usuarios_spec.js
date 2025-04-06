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
  
    // Envia uma requisição para criar um novo usuário e verifica se o status é 201, que indica que o recurso foi criado com sucesso.
    it('Deve criar um novo usuário com sucesso', () => {
      const novoUsuario = {
        nome: "João Teste",
        email: "joao.teste@teste.com",
        idade: 30
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
        expect(response.body).to.have.property('nome', novoUsuario.nome);
        expect(response.body).to.have.property('email', novoUsuario.email);
        expect(response.body).to.have.property('idade', novoUsuario.idade);
      });
    });
  
    it('Deve retornar status 404 ao tentar acessar um usuário inexistente', () => {
      const idInvalido = '999999';
      
      cy.request({
        method: 'GET',
        url: `${baseUrl}/${idInvalido}`,
        failOnStatusCode: false  // Impede o Cypress de falhar automaticamente para status >= 400
      }).then((response) => {
        expect(response.status).to.eq(404);
      });
    });
  
    // Atualiza as informações de um usuário existente e verifica se a resposta retorna com o status 200
    it('Deve atualizar as informações de um usuário', () => {
      const idExistente = '1'; // Substitua com um ID válido de um usuário existente
      const usuarioAtualizado = {
        nome: "João Atualizado",
        email: "joao.atualizado@teste.com",
        idade: 35
      };
  
      cy.request({
        method: 'PUT',
        url: `${baseUrl}/${idExistente}`,
        body: usuarioAtualizado,
        headers: {
          'Content-Type': 'application/json'
        }
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('nome', usuarioAtualizado.nome);
        expect(response.body).to.have.property('email', usuarioAtualizado.email);
        expect(response.body).to.have.property('idade', usuarioAtualizado.idade);
      });
    });
  
    // Deleta um usuário e verifica se a resposta contém a mensagem de sucesso.
    it('Deve deletar um usuário com sucesso', () => {
      const idExistente = '1'; // Substitua com um ID válido de um usuário existente
  
      cy.request({
        method: 'DELETE',
        url: `${baseUrl}/${idExistente}`
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('message', 'Registro excluído com sucesso');
      });
    });
  
  });
  
describe('Validation Json', () => { 
  
  it('Users', () => {
    cy.request('https://api-desafio-qa.onrender.com/users')
      .then((response) => {
        // Verifica se o status é 200
        expect(response.status).to.eq(200);
        
        // Visualiza a resposta JSON
        console.log(response.body); 

        // Encontra o usuário com id 1
        const user = response.body.find(user => user.id === 1);
        
        // Verifica se o usuário foi encontrado
        expect(user).to.exist; // Verifica se o usuário existe
        
        // Verifica as propriedades do usuário
        expect(user).to.have.property('email', 'john.doe@example.com'); // Verifica o email
        expect(user).to.have.property('name', 'John'); // Verifica o nome
        expect(user).to.have.property('last_name', 'Doe'); // Verifica o sobrenome
      });
  });
});

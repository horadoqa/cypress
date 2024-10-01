describe('Validation Json', () => { 
  
    it('Brasil', () => {
      cy.request('https://api-desafio-qa.onrender.com/brasil')
        .then((response) => {
          // Verifica se o status é 200
          expect(response.status).to.eq(200);
          
          // Visualiza a resposta JSON
          console.log(response.body); 
          
          // Verifica se o corpo da resposta é um array e se tem elementos
          expect(response.body).to.be.an('array').that.is.not.empty; 
          
          // Acessa o primeiro elemento do array
          const firstElement = response.body[0];
          
          // Verifica se o campo 'cioc' existe e tem o valor esperado
          expect(firstElement).to.have.property('cioc'); // Verifica se 'cioc' está presente
          expect(firstElement.cioc).to.eq('BRA'); // Verifica se 'cioc' é igual a 'BRA'
        });
    });
  });
  
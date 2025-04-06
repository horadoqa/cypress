describe('Testes API - Usuários', () => {
  const baseUrl = 'https://serverest.dev/usuarios';

  // Listar dados pelo ID
  it('Deve retornar as informações de um usuário existente', () => {
    const idValido = 'XNImm8eXee3TeggM';

    cy.request({
      method: 'GET',
      url: `${baseUrl}/${idValido}`,
    }).then((response) => {
      expect(response.status).to.eq(200);
      cy.log('Resposta completa:', JSON.stringify(response.body, null, 2)); // Exibe a resposta no log do Cypress
    });
  });
});

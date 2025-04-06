describe('Testes API - Usuários', () => {
  const baseUrl = 'https://serverest.dev/usuarios';

  it('Deve retornar as informações de um usuário existente', () => {
    const idValido = '';

    cy.request({
      method: 'GET',
      url: `${baseUrl}/${idValido}`,
    }).then((response) => {
      expect(response.status).to.eq(200);
      cy.log('Resposta completa:', JSON.stringify(response.body, null, 2));
    });
  });
});

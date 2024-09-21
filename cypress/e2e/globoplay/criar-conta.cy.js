describe('Globoplay - Criar a Conta', () => {
    
  it('Acessar o site do Globoplay', () => { 
    cy.visit('https://globoplay.globo.com/');
    cy.get('a.gplay-button.gplay-button--sales.gplay-button--focus-light.headband__button').should('have.text', 'Assine já').click({force: true})
    })
  
  it('Acessar o site do Vitrine', () => {
    cy.visit('https://vitrine.globo.com/globoplay?f_area=home&f_cpnt=banner_vendas&f_label=assinatura.assine_ja&url=https:%2F%2Fgloboplay.globo.com%2F&origemId=91628');
    cy.get('p.auth__button__title').should('have.text', 'Conta Globo').click();
    cy.get('a.Link__StyledLink-sc-1qc335g-0.dKAENH').should('have.text', 'Criar conta').click();
  })

  it('Preencher formulário', () => {
    cy.visit('https://login.globo.com/cadastro/6999?url=https%3A%2F%2Fid.globo.com%2Fauth%2Frealms%2Fglobo.com%2Flogin-actions%2Fauthenticate%3Fsession_code%3DXXEh4xLNCgKFvCfQ-oRwaeITU2lFOsQIZ826b3eTrFE%26execution%3D8feb8053-1729-44f9-bfa0-783a70e68d14%26client_id%3Dvitrine-globo%2540apps.globoid%26tab_id%3D3V-Gm-26qdw%26request-context%3DVXw4zY&error=&request-context=VXw4zY&_gl=1*1dcut7*_gcl_au*MzczMDE5MjAxLjE3MjY5MjQ0MjQ.*_ga*Mzc3NzY0NjIxNS4xNzI2OTI0NDI3*_ga_G5YX0X0P68*MTcyNjkyNDQzNS4xLjEuMTcyNjkyNDQzOS41Ni4wLjA.')
    cy.get('#nome').type('Ricardo Fahham');
    cy.get('#email').type('horadoqa@gmail.com');
    cy.get('#senha').type('1234567890');
    cy.get('#nascimento').type('01071971');
    cy.get('#termsOfUse').click()
  })
 
})
describe('Home globo.com', () => {

    it('Home globo.com', () => {
        cy.request({
            method: 'GET',
            url: 'https://www.globo.com'
        }).then ((resultado) => {
            expect(resultado.status).to.eql(200)
            
        })
    })

})
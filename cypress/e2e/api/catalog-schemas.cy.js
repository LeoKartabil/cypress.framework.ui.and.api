describe('Advantage Shopping - API Catalog Testing', () => {
 
    it('Deve validar o schema da resposta da rota GET MostPopularComments', () => {
        cy.request('/catalog/api/v1/MostPopularComments').then((response) => {
            cy.validateSchema(response, 'catalog/get-most-popular-comments', 200);
        });
    });

    it('Deve validar o schema da resposta da rota GET MostPopularComments', () => {
        cy.request('/catalog/api/v1/MostPopularComments').then((response) => {
            cy.validateSchema(response, 'catalog/get-most-popular-comments', 200);
        });
    });

});
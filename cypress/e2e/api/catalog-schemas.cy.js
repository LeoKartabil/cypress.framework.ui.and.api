describe('Advantage Shopping - API Catalog Testing', () => {
 
    it('Deve validar o schema da resposta da rota GET /MostPopularComments', () => {
        cy.api('/catalog/api/v1/MostPopularComments').then((response) => {
            cy.validateSchema(response, 'catalog/get-most-popular-comments', 200);
        });
    });

    it('Deve validar o schema da resposta da rota GET /attributes/colors_pallet', () => {
        cy.api('/catalog/api/v1/attributes/colors_pallet').then((response) => {
            cy.validateSchema(response, 'catalog/get-attributes-colors-pallet', 200);
        });
    });

});
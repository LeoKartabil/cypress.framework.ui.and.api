describe('Advantage Shopping - Register', () => {
    beforeEach(() => {
        cy.visit('/');
    });

    context('Validações de interface', () => {
       it('Deve exibir todos os elementos da tela de registro de usuários', function() {
            cy.accessRegisterPage()
            cy.verifyRegisterPageElements()
        });
    });

    context('Registro de usuário', () => {
        it.only('Deve registrar um novo usuário com sucesso', function() {
            cy.accessRegisterPage()
            cy.fixture('seeds/default_user.json').then((user) => {
                cy.registerUser(user);
                cy.get('#register_btn').should('not.be.disabled')
            })
        });
    });
});

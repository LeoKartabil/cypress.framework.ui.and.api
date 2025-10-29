describe('Advantage Shopping - Login', () => {
    beforeEach(() => {
        cy.intercept({ resourceType: /xhr|fetch/ }, { log: false })
        cy.visit('/');
    });

    context('Validações de interface', () => {
        it('Deve exibir todos os elementos da tela de login', () => {
            cy.get("#menuUserLink").should("be.visible").click();
            cy.get("img[src='../../css/images/logo.png']").should("be.visible");
            cy.contains("SIGN IN WITH FACEBOOK").should("be.visible");
            cy.contains("Username").should("be.hidden");
            cy.contains("Password").should("be.hidden");
            cy.contains("REMEMBER ME").should("be.visible");
            cy.get("#sign_in_btn").should("be.visible");
            cy.contains("Forgot your password?").should("be.visible");
            cy.contains("CREATE NEW ACCOUNT").should("be.visible");
        });
    });

    context('Login com sucesso', () => {
        it.only('Deve realizar login com credenciais válidas', () => {
            // * Implementar busca do usuário através da API para login
            // * Cadastrar um novo usuário e utilizá-lo para o login
            // * Possuir um usuário padrão com sync em procedures no banco de dados
            cy.login('QAutomation', 'zhcV@LJpnk3d');
            cy.get('#menuUserLink span.hi-user').should('be.visible');
            cy.get('#menuUserLink span.hi-user').should('have.text', 'QAutomation');
        });
    });

    context('Login com falha', () => {
        it('Deve exibir erro ao tentar login com usuário inválido', () => {
            cy.login('usuario_invalido', 'teste').then( () => {
                cy.contains("Incorrect user name or password. TESTE").should("be.visible");
            })
        });

        it('Deve exibir as mensagens de campos obrigatórios de login', () => {
            cy.get("#menuUserLink").should("be.visible").click();
            cy.wait(5000);
            cy.get("input[name='username']").click();
            cy.get("input[name='password']").click();
            cy.contains("Username field is required").should("be.visible");
            cy.get("input[name='username']").click();
            cy.contains("Password field is required").should("be.visible");
        });
    });

    afterEach(() => {
        // Limpeza após cada teste, se necessário
    });
});
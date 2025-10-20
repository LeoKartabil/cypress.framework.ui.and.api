Cypress.Commands.add('login', (email, password) => {
    cy.get("#menuUserLink").should("be.visible").click();
    cy.get("input[name='username']").type(email);
    cy.get("input[name='password']").type(password);
    cy.get("#sign_in_btn").click();
})
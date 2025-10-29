Cypress.Commands.add('verifyRegisterPageElements', () => {
    // Account Details Section
    cy.get('#formCover h3[translate="ACCOUNT_DETAILS"]').should('be.visible');
    cy.get('#formCover sec-view[a-hint="Username"] label').should('be.visible');
    cy.get('#formCover sec-view[sec-name="userEmail"] label').should('be.visible');
    cy.get('#formCover sec-view[a-hint="Password"] label').should('be.visible');
    cy.get('#formCover sec-view[a-hint="Confirm password"] label').should('be.visible');
    
    // Personal Details Section
    cy.get('#formCover h3[translate="PERSONAL_DETAILS"]').should('be.visible');
    cy.get('#formCover sec-view[sec-name="userFirstName"] label').should('be.visible');
    cy.get('#formCover sec-view[sec-name="userLastName"] label').should('be.visible');
    cy.get('#formCover sec-view[sec-name="userPhone"] label').should('be.visible');
    
    // Address Section
    cy.get('#formCover h3[translate="ADDRESS"]').should('be.visible');
    cy.get('#formCover sec-view[sec-name="userCountry"] div.ng-scope').should('be.visible');
    cy.get('#formCover sec-view[sec-name="userCity"] label').should('be.visible');
    cy.get('#formCover sec-view[sec-name="userAdress"] label').should('be.visible');
    cy.get('#formCover sec-view[sec-name="userState"] label').should('be.visible');
    cy.get('#formCover sec-view[sec-name="userPostalCode"] label').should('be.visible');
    
    // Terms and Register Button
    cy.get('#formCover span.ng-scope').should('be.visible');
    cy.get('#formCover label.checkboxText').should('be.visible');
    cy.get('#registerPage a.ng-scope').should('be.visible');
    cy.get('#register_btn').should('be.visible').and('be.disabled');
})

Cypress.Commands.add('registerUser', (userData) => {
    cy.get('#formCover sec-view[a-hint="Username"] input').type(userData.username);
    cy.get('input[name="emailRegisterPage"]').type(userData.email);
    cy.get('input[name="passwordRegisterPage"]').type(userData.password);
    cy.get('input[name="confirm_passwordRegisterPage"]').type(userData.password);
    cy.get('input[name="first_nameRegisterPage"]').type(userData.firstName);
    cy.get('input[name="last_nameRegisterPage"]').type(userData.lastName);
    cy.get('input[name="phone_numberRegisterPage"]').type(userData.phone);
    cy.get('select[name="countryListboxRegisterPage"]').select('United States');
    cy.get('input[name="cityRegisterPage"]').type(userData.city);
    cy.get('input[name="addressRegisterPage"]').type(userData.address);
    cy.get('#formCover [name="state_/_province_/_regionRegisterPage"]').focus();
    cy.get('#formCover [name="state_/_province_/_regionRegisterPage"]').type(userData.state);
    cy.get('input[name="postal_codeRegisterPage"]').type(userData.postalCode);
    cy.get('input[name="i_agree"]').check();
})

Cypress.Commands.add('accessRegisterPage', () => {
    cy.get("#menuUserLink").should("be.visible").click();
    cy.contains("CREATE NEW ACCOUNT").should("be.visible").click();
    cy.url().should('be.equal', 'https://www.advantageonlineshopping.com/#/register');
})
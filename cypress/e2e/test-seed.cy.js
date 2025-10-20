describe('Test Seed Data', () => {
    it('should load user seed data with faker values', () => {
        cy.fixture('seeds/user.json').then((user) => {
            cy.log(user)
            expect(user).to.have.property('fullName').that.is.a('string').and.is.not.empty;
            expect(user).to.have.property('gender').that.is.a('string').and.is.not.empty;
            expect(user).to.have.property('email').that.is.a('string').and.matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
            expect(new Date(user.birthday)).to.be.within(new Date('1970-01-01'), new Date('2007-01-01'));
        });
    });
});
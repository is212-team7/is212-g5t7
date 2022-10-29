describe('Create role', () => {
    it('passes', () => {
        // Login
        cy.visit('http://localhost:3000/login');
        cy.get('input[placeholder*="Email"]').type('jack.sim@allinone.com.sg');
        cy.get('input[placeholder*="Password"]').type('password');
        cy.get('button').click();

        const now = Date.now();
        const role = `Cypress Test Role #${now}`;
        const description = `This is a dummy role created by Cypress at ${now}.`;

        // Create role
        cy.get('button:contains("Create role")').click();
        cy.get('input[placeholder*="Role"]').type(role);
        cy.get('input[placeholder*="Description"]').type(description);
        cy.get('button:contains("Submit")').click();

        cy.wait(3000);

        cy.get('tr')
            .last()
            .children()
            .should('have.length', 6)
            .should(($tr) => {
                expect($tr.first()).to.contain(role);
                expect($tr[1]).to.contain(description);
                expect($tr[2]).to.contain('false');
            });

        // Delete role
        cy.get('button:contains("Delete")').last().click();
        cy.get('tr')
            .last()
            .children()
            .should(($tr) => {
                expect($tr.first()).to.contain(role);
                expect($tr[1]).to.contain(description);
                expect($tr[2]).to.contain('true'); // soft-deleted
            });
    });
});

export {};

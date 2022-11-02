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

        cy.wait(3000); // takes a while for the page to re-render with the new role

        cy.get('button:contains("Skills")').last().click();

        cy.wait(15000);

        cy.get('.select.multiple', { timeout: 20000 }).children().eq(1).click();
        cy.get('div.select-dropdown').first().click();
        cy.get('.select.multiple', { timeout: 20000 }).children().eq(1).click();
        cy.get('button:contains("Submit")').click();

        cy.reload();
        cy.get('button:contains("Skills")').last().click();
        // Naively check for a single child in the multi-select box
        // Signifies that the skill assigned previously is recorded in the database
        cy.wait(15000);
        cy.get('.select.multiple')
            .first()
            .children()
            .eq(1)
            .should('have.length', 1); // check console for no. of children
    });
});

export {};

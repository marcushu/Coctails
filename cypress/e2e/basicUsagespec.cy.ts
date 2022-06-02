/// <reference types="cypress" />

describe('basicUsagespec.cy.ts', () => {
  it('should find with drink search', () => {
    cy.visit('http://localhost:3000');

    cy.get(`#coctailName`).type('martini');
    // find btn
    cy.get(`.MuiButton-root`).click();

    cy.contains('Dry Martini');

  });


  it('should display contents when clicked', () => {
    // click minified drink card
    cy.get(`:nth-child(2) > .css-0 > .MuiTypography-root`).click();

    cy.contains('Olive');

  });


  it('closes recipe when clicked', () => {
    // click opened drink card image (two other clickable fields available)
    cy.get(`img`).click();

    cy.contains('Olive').should('not.exist');
    
  });

  it('clears out search by drink to search by ingredient', () => {
    cy.get(`#ingredient`).type('tequila');
    // find btn
    cy.get(`.MuiButton-root`).click();
    // click minified drink card
    cy.get(`.css-1tufyqi > :nth-child(4)`).click();

    cy.contains('2 oz Tequila');

  });
})

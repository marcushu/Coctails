/// <reference types="cypress" />

const recipeImage =
  'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=';

const dryMartini = {
  idDrink: '11000',
  strDrink: 'Dry Martini',
  strDrinkThumb: recipeImage,
};

const dirtyMartini = {
  idDrink: '11001',
  strDrink: 'Dirty Martini',
  strDrinkThumb: recipeImage,
};

const martiniRecipe = {
  idDrink: '11000',
  strDrink: 'Dry Martini',
  strDrinkThumb: recipeImage,
  strGlass: 'Cocktail glass',
  strInstructions: 'Stir and strain into a chilled glass.',
  strIngredient1: 'Gin',
  strMeasure1: '2 oz',
  strIngredient2: 'Olive',
  strMeasure2: null,
};

const tequilaDrink = {
  idDrink: '15423',
  strDrink: '110 in the shade',
  strDrinkThumb: recipeImage,
};

const tequilaRecipe = {
  idDrink: '15423',
  strDrink: '110 in the shade',
  strDrinkThumb: recipeImage,
  strGlass: 'Beer Glass',
  strInstructions: 'Drop shooter in glass. Fill with beer.',
  strIngredient1: 'Lager',
  strMeasure1: '16 oz',
  strIngredient2: 'Tequila',
  strMeasure2: '1.5 oz',
};

const stubMartiniSearch = () => {
  cy.intercept('GET', '**/search.php?s=martini', {
    drinks: [dryMartini, dirtyMartini],
  });
  cy.intercept('GET', '**/lookup.php?i=11000', {
    drinks: [martiniRecipe],
  });
};

const searchByName = (name: string) => {
  cy.get('#coctailName').type(name);
  cy.contains('button', 'find').click();
};

describe('cocktail search and recipes', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });

  it('finds drinks by name', () => {
    stubMartiniSearch();
    searchByName('martini');
    cy.contains('[data-testid="drink-result"]', 'Dry Martini').should('be.visible');
  });

  it('displays a recipe when a drink result is selected', () => {
    stubMartiniSearch();
    searchByName('martini');
    cy.contains('[data-testid="drink-result"]', 'Dry Martini').click();
    cy.contains('Olive').should('be.visible');
  });

  it('closes an open recipe when its image is clicked', () => {
    stubMartiniSearch();
    searchByName('martini');
    cy.contains('[data-testid="drink-result"]', 'Dry Martini').click();
    cy.contains('Olive').should('be.visible');
    cy.get('img[alt="drikimage"]').click();
    cy.contains('Olive').should('not.exist');
  });

  it('clears the name field when switching to ingredient search', () => {
    cy.intercept('GET', '**/filter.php?i=tequila', {
      drinks: [tequilaDrink],
    });
    cy.intercept('GET', '**/lookup.php?i=15423', {
      drinks: [tequilaRecipe],
    });

    cy.get('#coctailName').type('martini');
    cy.get('#ingredient').type('tequila');
    cy.get('#coctailName').should('have.value', '');
    cy.contains('button', 'find').click();
    cy.contains('1.5 oz Tequila').should('be.visible');
  });

  it('requires exactly one search value', () => {
    cy.contains('button', 'find').click();
    cy.contains('PLEASE ENTER EITHER AN INGREDIENT OR A COCTAIL NAME.')
      .should('be.visible');
  });

  it('shows a message when a search has no matches', () => {
    cy.intercept('GET', '**/search.php?s=unknown', { drinks: null });
    searchByName('unknown');
    cy.contains('Nothing found with unknown').should('be.visible');
  });

  it('shows the correct recipe for an ingredient search result', () => {
    cy.intercept('GET', '**/filter.php?i=tequila', {
      drinks: [tequilaDrink],
    });
    cy.intercept('GET', '**/lookup.php?i=15423', {
      drinks: [tequilaRecipe],
    });

    cy.get('#ingredient').type('tequila');
    cy.contains('button', 'find').click();
    cy.contains('1.5 oz Tequila').should('be.visible');
    cy.contains('110 in the shade').should('be.visible');
  });

  it('paginates search results', () => {
    const drinks = Array.from({ length: 12 }, (_, index) => ({
      idDrink: `${12000 + index}`,
      strDrink: `Test Drink ${index + 1}`,
      strDrinkThumb: recipeImage,
    }));

    cy.intercept('GET', '**/search.php?s=martini', { drinks });
    searchByName('martini');

    cy.get('[data-testid="drink-result"]').should('have.length', 10);
    cy.get('[data-testid="drink-result"]')
      .first()
      .should('contain.text', 'Test Drink 1');
    cy.get('[aria-label="Go to page 2"]').click();
    cy.get('[data-testid="drink-result"]').should('have.length', 2);
    cy.get('[data-testid="drink-result"]')
      .first()
      .should('contain.text', 'Test Drink 11');
  });

  it('replaces prior results when a new search is submitted', () => {
    stubMartiniSearch();
    const margarita = {
      idDrink: '12000',
      strDrink: 'Margarita',
      strDrinkThumb: recipeImage,
    };
    const margaritaRecipe = {
      ...margarita,
      strGlass: 'Cocktail glass',
      strInstructions: 'Shake and strain.',
      strIngredient1: 'Tequila',
      strMeasure1: '1 oz',
    };

    cy.intercept('GET', '**/search.php?s=margarita', { drinks: [margarita] });
    cy.intercept('GET', '**/lookup.php?i=12000', {
      drinks: [margaritaRecipe],
    });

    searchByName('martini');
    cy.contains('[data-testid="drink-result"]', 'Dry Martini').click();
    cy.contains('Olive').should('be.visible');

    cy.get('#coctailName').clear().type('margarita');
    cy.contains('button', 'find').click();

    cy.contains('Margarita').should('be.visible');
    cy.contains('Dry Martini').should('not.exist');
    cy.contains('Olive').should('not.exist');
  });
});

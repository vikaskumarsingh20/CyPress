// cypress/e2e/login.cy.js

describe('Authentication Flow', () => {
  const validEmail = 'faltumail9231@gmail.com';
  const validPassword = 'Faltu@231';
  const testEmail = 'test@example.com';
//   const baseUrl = 'https://eliter.co.uk';
  const baseUrl = 'http://116.202.210.102:5173';

  context('Registration and Login', () => {
    it('should sign up and then log in with valid credentials, then reach dashboard', () => {
      // Register
    cy.visit(`${baseUrl}/register`);
      cy.wait(1000);
      cy.get('input[type="email"]').clear().type(validEmail);
      cy.get('input[type="password"]').clear().type(validPassword);
      cy.wait(500);
      cy.get('button[type="submit"]').click();
      cy.wait(1500);
      cy.url().should('include', '/login');

      // Login
      cy.get('input[type="email"]').clear().type(validEmail);
      cy.get('input[type="password"]').clear().type(validPassword);
      cy.wait(500);
      cy.get('button[type="submit"]').click();
      cy.wait(1500);
      cy.url().should('include', '/dashboard');
      cy.visit(`${baseUrl}/dashboard`);
      cy.wait(1000);
      cy.contains('dashboard', { matchCase: false });
    });
  });

  context('Registration Form Validations', () => {
    beforeEach(() => {
      cy.visit(`${baseUrl}/register`);
      cy.wait(1000);
    });

    it('should show required error when fields are empty', () => {
      cy.get('button[type="submit"]').click();
      cy.contains('Invalid email address').should('be.visible');
      cy.contains('Password must be at least 6 characters').should('be.visible');
    });

    it('should show error for Password must be at least 6 characters', () => {
      cy.get('input[type="email"]').type(testEmail);
      cy.get('input[type="password"]').type('Ab@1');
      cy.wait(500);
      cy.get('button[type="submit"]').click();
      cy.wait(500);
      cy.contains('Password must be at least 6 characters').should('be.visible');
    });

    it('should show error if password does not have a capital letter', () => {
      cy.get('input[type="email"]').type(testEmail);
      cy.get('input[type="password"]').type('ab@12345');
      cy.wait(500);
      cy.get('button[type="submit"]').click();
      cy.wait(500);
      cy.contains('Password must contain at least one uppercase letter').should('be.visible');
    });

    it('should show error if password does not have a small letter', () => {
      cy.get('input[type="email"]').type(testEmail);
      cy.get('input[type="password"]').type('AB@12345');
      cy.wait(500);
      cy.get('button[type="submit"]').click();
      cy.wait(500);
      cy.contains('Password must contain at least one lowercase letter').should('be.visible');
    });

    it('should show error if password does not have a special character', () => {
      cy.get('input[type="email"]').type(testEmail);
      cy.get('input[type="password"]').type('Abc12345');
      cy.wait(500);
      cy.get('button[type="submit"]').click();
      cy.wait(500);
      cy.contains('Password must contain at least one special character').should('be.visible');
    });
  });

  context('Login Form', () => {
    beforeEach(() => {
      cy.visit(`${baseUrl}/login`);
      cy.wait(1000);
    });

    it('should successfully log in with valid credentials', () => {
      cy.get('input[type="email"]').type(testEmail);
      cy.get('input[type="password"]').type('Ab@12345');
      cy.wait(500);
      cy.get('button[type="submit"]').click();
      cy.wait(1000);
      cy.url().should('not.include', '/login');
    });
  });
});
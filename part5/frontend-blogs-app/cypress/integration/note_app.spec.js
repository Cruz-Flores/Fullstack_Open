describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset');
    const user = {
      name: 'Cruz',
      username: 'Cruzito',
      password: 'ganjah',
    };
    cy.request('POST', 'http://localhost:3001/api/users', user);
    cy.visit('http://localhost:3000');
  });

  it('Login form is shown', function () {
    cy.contains('Username');
    cy.contains('Password');
  });

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('Cruzito');
      cy.get('#password').type('ganjah');
      cy.get('#logFormButton').click();
      cy.contains('Cruz logged in');
    });

    it('fails with wrong credentials', function () {
      cy.get('#username').type('Cruzito');
      cy.get('#password').type('cocol');
      cy.get('#logFormButton').click();
      cy.contains('Wrong credentials');

      cy.get('.error').should('have.css', 'color', 'rgb(255, 0, 0)');
    });
  });

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'Cruzito', password: 'ganjah' });
    });

    it('A blog can be created', function () {
      cy.contains('create').click();
      cy.get('#title').type('blog test');
      cy.get('#author').type('coder');
      cy.get('#url').type('vw.com');
      cy.get('#createBlogButton').click();

      cy.contains('blog test - coder');
    });

    describe('When a blog created', function () {
      beforeEach(function () {
        cy.createBlog({
          title: 'automatic blog',
          author: 'coder',
          url: 'vw.com',
        });
      });

      it('A blog can be like', function () {
        cy.get('#viewButton').click();
        cy.get('#likeButton').click();
        cy.get('#blogDiv').should('contain', '1');
      });

      it.only('A blog can be deleted', function () {
        cy.get('#viewButton').click();
        cy.get('#likeButton').click();
        cy.contains('remove').click();

        cy.get('html').should('not.contain', 'automatic blog');
      });
    });
  });
});

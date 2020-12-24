Cypress.Commands.add('login', ({ username, password }) => {
  cy.get('#username').type(username)
  cy.get('#password').type(password)
  cy.contains('Login').click()
})

Cypress.Commands.add('createBlog', ({ title, author, url }) => {
  cy.contains('New blog').click()
  cy.get('#titleInput').type(title)
  cy.get('#authorInput').type(author)
  cy.get('#urlInput').type(url)
  cy.contains('Create').click()
})

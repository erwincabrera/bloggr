describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'Foo Bar',
      username: 'foo',
      password: 'bar'
    }
    cy.request('POST', 'http://localhost:3001/api/users', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('Username')
    cy.contains('Password')
    cy.contains('Login')
  })

  describe('Login', function() {
    it('succeeds with correct credentials', function() {
      cy.login({ username: 'foo', password: 'bar' })
      cy.contains('Foo Bar logged in')
    })

    it('fails with wrong credentials', function() {
      cy.login({ username: 'foo', password: 'wrong' })
      cy.get('.notification').contains('Invalid username or password')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'foo', password: 'bar' })
    })

    it('A blog can be created', function() {
      cy.createBlog({ title: 'New title', author: 'New author', url: 'New url' })
      cy.contains('New title')
      cy.contains('New author')
    })

    describe('Blog actions', function() {
      beforeEach(function() {
        cy.createBlog({ title: 'New title', author: 'New author', url: 'New url' })
      })

      it('User can like a blog', function() {
        cy.contains('Show').click()
        cy.contains('Likes: 0')
        cy.contains('Like').click()
        cy.contains('Likes: 1')
      })

      it('User can delete a blog', function() {
        cy.contains('Show').click()
        cy.contains('Delete').click()
        cy.get('html').should('not.contain', 'New title')
          .and('not.contain', 'New author')
          .and('not.contain', 'New url')
          .and('not.contain', 'Like')
      })
    })

    it('blogs are ordered according to number of likes', function() {
      cy.createBlog({ title: 'title 1', author: 'author 1', url: 'url 1' })
      cy.createBlog({ title: 'title 2', author: 'author 2', url: 'url 2' })
      cy.createBlog({ title: 'title 3', author: 'author 3', url: 'url 3' })
      cy.wait(500)

      cy.get('.blogs').contains('title 1').parent().as('firstBlog')
      cy.get('@firstBlog').contains('Show').click()
      cy.get('@firstBlog').find('.like').as('firstLikeButton')
      cy.get('@firstLikeButton').click()

      cy.get('.blogs').contains('title 2').parent().as('secondBlog')
      cy.get('@secondBlog').contains('Show').click()
      cy.get('@secondBlog').find('.like').as('secondLikeButton')
      cy.get('@secondLikeButton').click()
      cy.wait(500)
      cy.get('@secondLikeButton').click()

      cy.get('.blogs').contains('title 3').parent().as('thirdBlog')
      cy.get('@thirdBlog').contains('Show').click()
      cy.get('@thirdBlog').find('.like').as('thirdLikeButton')
      cy.get('@thirdLikeButton').click()
      cy.wait(500)
      cy.get('@thirdLikeButton').click()
      cy.wait(500)
      cy.get('@thirdLikeButton').click()
      cy.wait(500)
      cy.get('.blogs').find('span').then(res => {
        expect(res[0].textContent).to.contain('title 3')
        expect(res[1].textContent).to.contain('title 2')
        expect(res[2].textContent).to.contain('title 1')
      })
    })
  })
})
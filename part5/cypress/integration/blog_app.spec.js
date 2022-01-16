describe('Note app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Riku Manninen',
      username: 'riku',
      password: 'salasana'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('log in to application')
    cy.contains('username')
    cy.contains('password')
    cy.contains('login')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('input:first').type('riku')
      cy.get('input:last').type('salasana')
      cy.contains('login').click()
      cy.contains('Riku Manninen logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('input:first').type('riku')
      cy.get('input:last').type('salasana2')
      cy.contains('login').click()
      cy.contains('wrong username or password').should('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.get('input:first').type('riku')
      cy.get('input:last').type('salasana')
      cy.contains('login').click()
      cy.contains('Riku Manninen logged in')
    })

    it('A blog can be created', function() {
      cy.contains('new blog').click()
      cy.get('input[name="Title"]').type('a blog added by cypress')
      cy.get('input[name="Author"]').type('cypress')
      cy.get('input[name="Url"]').type('https://google.com')
      cy.get('button[type="submit"]').contains('create').click()
      cy.get('.minimizedContent').contains('a blog added by cypress')
    })

    it('A blog can be liked', function() {
      cy.contains('new blog').click()
      cy.get('input[name="Title"]').type('a blog added by cypress')
      cy.get('input[name="Author"]').type('cypress')
      cy.get('input[name="Url"]').type('https://google.com')
      cy.get('button[type="submit"]').contains('create').click()
      cy.get('.minimizedContent').contains('a blog added by cypress')
      cy.contains('show').click()
      cy.contains('likes 0')
      cy.contains('like').click()
      cy.contains('likes 1')
    })

    it('A blog can be removed', function() {
      cy.contains('new blog').click()
      cy.get('input[name="Title"]').type('a blog added by cypress')
      cy.get('input[name="Author"]').type('cypress')
      cy.get('input[name="Url"]').type('https://google.com')
      cy.get('button[type="submit"]').contains('create').click()
      cy.get('.minimizedContent').contains('a blog added by cypress')
      cy.reload()
      cy.contains('show').click()
      cy.contains('remove').click()
      cy.get('.minimizedContent').contains('a blog added by cypress').should('have.css', 'display', 'none')
    })

    it('A blog cannot be removed by another user', function() {
      const anotherUser = {
        name: 'Matti Meikäläinen',
        username: 'matti',
        password: 'salasana'
      }
      cy.request('POST', 'http://localhost:3003/api/users/', anotherUser)
      cy.contains('new blog').click()
      cy.get('input[name="Title"]').type('a blog added by cypress')
      cy.get('input[name="Author"]').type('cypress')
      cy.get('input[name="Url"]').type('https://google.com')
      cy.get('button[type="submit"]').contains('create').click()
      cy.get('.minimizedContent').contains('a blog added by cypress')
      cy.contains('logout').click()
      cy.reload()
      cy.get('input:first').type('matti')
      cy.get('input:last').type('salasana')
      cy.contains('login').click()
      cy.contains('Matti Meikäläinen logged in')
      cy.contains('show').click()
      cy.contains('remove').should('not.exist')
    })

    it('Blogs are being sorted correctly', function() {

      const likes = [1, 66, 42, 99, 0, 100]

      likes.forEach((like, i) => {
        cy.createBlog({
          title: `Blog ${i+1}`,
          author: 'riku',
          url: 'google.com',
          likes: like,
        })
      })

      likes.sort((a, b) => (b - a))

      cy.get('div[style*=\'border\'').as('blogs')

      cy.get('@blogs').each(
        ($blog, i) => {
          if (i >= 0) {
            cy.wrap($blog).contains('show').click()
            cy.wrap($blog).contains(`likes ${likes[i]}`)
          }
        }
      )
    })
  })
})
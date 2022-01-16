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
})
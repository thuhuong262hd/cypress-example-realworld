/// <reference types="cypress" />
import '@cypress/code-coverage/support'

const apiUrl = Cypress.env('apiUrl')

// a custom Cypress command to login using XHR call
// and then set the received token in the local storage
// can log in with default user or with a given one
Cypress.Commands.add('login', (user = Cypress.env('user')) => {
  cy.request('POST', `${apiUrl}/api/users/login`, {
    user: Cypress._.pick(user, ['email', 'password'])
  })
    .its('body.user.token')
    .should('exist')
    .then(token => {
      localStorage.setItem('jwt', token)
      // with this token set, when we visit the page
      // the web application will have the user logged in
    })

  cy.visit('/')
})

// creates a user with email and password
// defined in cypress.json environment variables
// if the user already exists, ignores the error
// or given user info parameters
Cypress.Commands.add('registerUserIfNeeded', (options = {}) => {
  const defaults = {
    username: 'testuser',
    image: 'https://robohash.org/6FJ.png?set=set3&size=150x150',
    // email, password
    ...Cypress.env('user')
  }
  const user = Cypress._.defaults({}, options, defaults)
  cy.request({
    method: 'POST',
    url: `${apiUrl}/api/users`,
    body: {
      user
    },
    failOnStatusCode: false
  })
})

/**
 * Dispatches a given Redux action straight to the application
 */
Cypress.Commands.add('dispatch', action => {
  expect(action)
    .to.be.an('object')
    .and.to.have.property('type')
  cy.window()
    .its('store')
    .invoke('dispatch', action)
})

/**
 * Single command to write a post
 */
Cypress.Commands.add('article', fields => {
  expect(fields)
    .to.be.an('object')
    .and.to.have.all.keys(['title', 'description', 'body', 'tags'])

  // can we create an article using `cy.task`?

  // TODO use data-cy for new post link
  cy.contains('a.nav-link', 'New Post').click()
  cy.location('pathname').should('equal', '/editor')

  // separate Redux actions for each field
  cy.dispatch({
    type: 'UPDATE_FIELD_EDITOR',
    key: 'title',
    value: fields.title
  })

  cy.dispatch({
    type: 'UPDATE_FIELD_EDITOR',
    key: 'description',
    value: fields.description
  })

  cy.dispatch({
    type: 'UPDATE_FIELD_EDITOR',
    key: 'body',
    value: fields.body
  })

  if (fields.tags.length) {
    cy.get('[data-cy=tags]').type(fields.tags.join('{enter}') + '{enter}')
    cy.get('.tag-pill').should('have.length', fields.tags.length)
  }
  cy.get('[data-cy=publish]').click()

  cy.location('pathname').should('not.equal', '/editor')
})

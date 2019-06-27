# realworld [![renovate-app badge][renovate-badge]][renovate-app] [![CircleCI](https://circleci.com/gh/cypress-io/cypress-example-realworld/tree/master.svg?style=svg&circle-token=f127e83138e505b26bb90ab7c0bcb60e5265fecb)](https://circleci.com/gh/cypress-io/cypress-example-realworld/tree/master) [![Coverage Status](https://coveralls.io/repos/github/cypress-io/cypress-example-realworld/badge.svg?branch=master)](https://coveralls.io/github/cypress-io/cypress-example-realworld?branch=master)

Fork of [applitools/cypress-applitools-webinar](https://github.com/applitools/cypress-applitools-webinar) which is a fork of [gothinkster/realworld](https://github.com/gothinkster/realworld).

![Application](images/app.png)

## Tests

The tests are in [cypress/integration](cypress/integration) folder

- [feeds-spec.js](cypress/integration/feeds-spec.js) shows how to check the favorite articles feed and the global feed
- [follow-user-spec.js](cypress/integration/follow-user-spec.js) shows how to create two users and check if one user can follow the other
- [login-spec.js](cypress/integration/login-spec.js) checks if the user can log in via UI and via API
- [new-post-spec.js](cypress/integration/new-post-spec.js) verifies that a new article can be published and updated
- [profile-spec.js](cypress/integration/profile-spec.js) lets the user edit their profile
- [register-spec.js](cypress/integration/register-spec.js) tests if a new user can register
- [tags-spec.js](cypress/integration/tags-spec.js) checks if tags work

## Full code coverage

Front- and back-end coverage for this application is collected using [@cypress/code-coverage](https://github.com/cypress-io/code-coverage). We run the locally instrumented server and client using `npm run dev:coverage`. The backend coverage is exposed in [server/server/index.js](server/server/index.js) via endpoint listed in [cypress.json](cypress.json). Frontend coverage is collected by instrumenting source code on the fly, see [client/.babelrc](client/.babelrc) file.

The combined report is saved in `coverage/index.html` after the test finish:

![Example full coverage report](images/full-coverage.png)

The coverage is sent to [Coveralls.io](https://coveralls.io/repos/github/cypress-io/cypress-example-realworld) using command `npm run coveralls`.

To learn more, read the [Cypress code coverage guide](https://on.cypress.io/coverage).

[renovate-badge]: https://img.shields.io/badge/renovate-app-blue.svg
[renovate-app]: https://renovateapp.com/

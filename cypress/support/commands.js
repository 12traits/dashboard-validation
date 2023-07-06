// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })


import "cypress-localstorage-commands";

Cypress.Commands.add('login', () => {
  cy.request({
    method: 'POST',
    url: `${Cypress.env('GATEWAY')}/users/v2/auth/login`,
    headers: {
      authority: 'gateway.solsten.io',
      accept: '*/*',
      authorization: 'Bearer',
      'content-type': 'application/json',
      origin: `https://${Cypress.env('COMPANY_NAME')}.solsten.io`,
      referer: `https://${Cypress.env('COMPANY_NAME')}.solsten.io`,
      scheme: 'https',
    },
    body: {
      email: 'superadmin@solsten.io',
      pass: '1Oc4b^@DPMYInI!51MrlE5sw',
    },
    redirect: 'follow',
  })
    //.its('body')
    .then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body.data).to.have.property('jwt')
      window.localStorage.setItem("accessToken", response.body.data.jwt);
    })
  cacheAcrossSpecs: true
});


Cypress.Commands.add('dashboard', (name) => {
  cy.request({
    method: 'GET',
    url: `${Cypress.env('GATEWAY')}/core/v1/company/dashboards`,
    headers: {
      authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      accept: 'application/json',
    }
  }).its('body.data.dashboards').each((dashboard) => {
    if (dashboard.name === name) {
      window.localStorage.setItem("gameToken", dashboard.jwt);
      window.localStorage.setItem("personaCount", dashboard.clusters);
    }
  });
});
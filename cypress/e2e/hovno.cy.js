const login = (name) => {
  cy.session(name, () => {
    cy.request({
      method: 'POST',
      url: `${Cypress.env('gateway')}/users/v2/auth/login`,
      headers: {
        authority: 'gateway.solsten.io',
        accept: '*/*',
        authorization: 'Bearer',
        'content-type': 'application/json',
        origin: 'https://supercell.solsten.io',
        referer: 'https://supercell.solsten.io/',
        scheme: 'https',
      },
      body: {
        email: 'superadmin@solsten.io',
        pass: '1Oc4b^@DPMYInI!51MrlE5sw',
      },
      redirect: 'follow',
    }).then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body.data).to.have.property('jwt')
      window.localStorage.setItem('accessToken', response.body.data.jwt)
    })
    cacheAcrossSpecs: true
  })

}

describe('Dashboard', () => {
  before(() => {
    login('login')
  })

  it('Get authentificated user detials', () => {
    cy.request({
      method: 'GET',
      url: `${Cypress.env('gateway')}/users/v1/me`,
      headers: {
        authorization: `Bearer ${window.localStorage.getItem('accessToken')}`,
        accept: 'application/json',
      },
    })
      .then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.data).to.have.property('email', 'superadmin@solsten.io');
      });
  });

})

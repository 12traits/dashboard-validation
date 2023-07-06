import "cypress-localstorage-commands";

describe('Dashboard', () => {
  beforeEach(() => {
    cy.login()
    cy.dashboard(Cypress.env('GAME_NAME'))
  })

  it('should get authentificated user detials', () => {
    cy.request({
      method: 'GET',
      url: `${Cypress.env('GATEWAY')}/users/v1/me`,
      headers: {
        authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        accept: 'application/json',
      },
    })
      .then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.data).to.have.property('email', 'superadmin@solsten.io');
      });
  });

  it('should get valid values for Market Potential', () => {
    cy.request({
      method: 'GET',
      url: `${Cypress.env('GATEWAY')}/core/v1/dashboard/market/spend?cluster=all`,
      headers: {
        authorization: `Bearer ${localStorage.getItem('gameToken')}`,
        accept: 'application/json',
      },
    })
      //.then((response) => { expect(response.status).to.eq(200) })
      .its('body.data').each((data) => {
        expect(data).to.have.keys([
          'persona',
          'avg_value',
          'min_value',
          'max_value',
          'mean_value',
          'min_ci',
          'max_ci',
        ]);

        expect(data.persona).to.be.a('number').and.to.be.lessThan(100)
        expect(data.avg_value).to.be.a('number').and.to.be.lessThan(100)
        expect(data.min_value).to.be.a('number').and.to.be.lessThan(100)
        expect(data.max_value).to.be.a('number').and.to.be.greaterThan(0).and.to.be.lessThan(100)
        expect(data.mean_value).to.be.a('number').and.to.be.greaterThan(0).and.to.be.lessThan(100)
        expect(data.min_ci).to.be.a('number').and.to.be.greaterThan(0).and.to.be.lessThan(100)
        expect(data.max_ci).to.be.a('number').and.to.be.greaterThan(0).and.to.be.lessThan(100)

      })
  });

  it('should get valid values for Player Centered Score', () => {

    cy.request({
      method: 'GET',
      url: `${Cypress.env('GATEWAY')}/sba/projects/scores/pcs`,
      headers: {
        authorization: `Bearer ${localStorage.getItem('gameToken')}`,
        accept: 'application/json',
      },
    })
      .then((response) => {
        expect(response.status).to.eq(200)
        Object.keys(response.body).forEach(key => {
          expect(response.body[key]).to.be.a('number').and.to.be.greaterThan(0).and.to.be.lessThan(100)
        });
      })
  })

  for (let index = 0; index < localStorage.getItem('personaCount'); index++) {
    it(`should get valid values for Favorite Apps for Persona ${index + 1}`, () => {
      cy.request({
        method: 'GET',
        url: `${Cypress.env('GATEWAY')}/sba/clusters/app/favorites?cluster=${index}`,
        headers: {
          authorization: `Bearer ${localStorage.getItem('gameToken')}`,
          accept: 'application/json',
        },
      })
        .then((response) => {
          expect(response.status).to.eq(200)
          expect(response.body.type).equal('app')
          expect(response.body.data).not.to.be.empty

          response.body.data.forEach((data) => {
            expect(data).to.have.keys(['count', 'percentage', 'rank', 'url', 'value'])
            expect(data.count).to.be.a('number').and.to.be.greaterThan(0)
            expect(data.percentage).to.be.a('number').and.to.be.greaterThan(0).and.to.be.lessThan(100)
            expect(data.rank).to.be.a('number').and.to.be.greaterThan(0).and.to.be.lessThan(100)
            expect(data.url).to.be.a('string').and.to.be.not.empty
            expect(data.value).to.be.a('string').and.to.be.not.empty

            cy.request({
              method: 'GET',
              url: data.url,

            }).then((response) => {
              expect(response.status).to.eq(200)
            })
          })
        })
    });
  }

  for (let index = 0; index < localStorage.getItem('personaCount'); index++) {
    it(`should get valid values for Favorite Movies for Persona ${index + 1}`, () => {
      cy.request({
        method: 'GET',
        url: `${Cypress.env('GATEWAY')}/sba/clusters/movie/favorites?cluster=${index}`,
        headers: {
          authorization: `Bearer ${localStorage.getItem('gameToken')}`,
          accept: 'application/json',
        },
      })
        .then((response) => {
          expect(response.status).to.eq(200)
          expect(response.body.type).equal('movie')
          expect(response.body.data).not.to.be.empty

          response.body.data.forEach((data) => {
            expect(data).to.have.keys(['count', 'percentage', 'rank', 'rating', 'type', 'url', 'value', 'year'])
            expect(data.count).to.be.a('number').and.to.be.greaterThan(0)
            expect(data.percentage).to.be.a('number').and.to.be.greaterThan(0).and.to.be.lessThan(100)
            expect(data.rank).to.be.a('number').and.to.be.greaterThan(0).and.to.be.lessThan(100)
            expect(data.type).to.be.a('string').and.to.be.not.empty
            expect(data.year).to.be.a('number').and.to.be.greaterThan(1900).and.to.be.lessThan(2030)

            expect(data.url).to.be.a('string').and.to.be.not.empty
            expect(data.value).to.be.a('string').and.to.be.not.empty

            cy.request({
              method: 'GET',
              url: data.url,

            }).then((response) => {
              expect(response.status).to.eq(200)
            })
          })
        })
    });
  }

  for (let index = 0; index < localStorage.getItem('personaCount'); index++) {
    it(`should get valid values for Favorite Brands for Persona ${index + 1}`, () => {
      cy.request({
        method: 'GET',
        url: `${Cypress.env('GATEWAY')}/sba/clusters/brand/favorites?cluster=${index}`,
        headers: {
          authorization: `Bearer ${localStorage.getItem('gameToken')}`,
          accept: 'application/json',
        },
      })
        .then((response) => {
          expect(response.status).to.eq(200)
          expect(response.body.type).equal('brand')
          expect(response.body.data).not.to.be.empty

          response.body.data.forEach((data) => {
            expect(data).to.have.keys(['count', 'percentage', 'rank', 'url', 'value'])
            expect(data.count).to.be.a('number').and.to.be.greaterThan(0)
            expect(data.percentage).to.be.a('number').and.to.be.greaterThan(0).and.to.be.lessThan(100)
            expect(data.rank).to.be.a('number').and.to.be.greaterThan(0).and.to.be.lessThan(100)
            expect(data.url).to.be.a('string').and.to.be.empty
            expect(data.value).to.be.a('string').and.to.be.not.empty

          })
        })
    });
  }

  for (let index = 0; index < localStorage.getItem('personaCount'); index++) {
    it(`should get valid values for Favorite Games for Persona ${index + 1}`, () => {
      cy.request({
        method: 'GET',
        url: `${Cypress.env('GATEWAY')}/sba/clusters/games?with_facebook_targeting=false&cluster=${index}`,
        headers: {
          authorization: `Bearer ${localStorage.getItem('gameToken')}`,
          accept: 'application/json',
        },
      })
        .then((response) => {
          expect(response.status).to.eq(200)
          expect(response.body.games).not.to.be.empty

          response.body.games.forEach((data) => {
            expect(data).to.have.keys(['count', 'percentage', 'rank', 'url', 'value'])
            expect(data.rank).to.be.a('number').and.to.be.greaterThan(0).and.to.be.lessThan(100)
            expect(data.url).to.be.a('string').and.to.be.not.empty
            expect(data.value).to.be.a('string').and.to.be.not.empty

            cy.request({
              method: 'GET',
              url: data.url.includes('https:') ? data.url : `https:${data.url}`,

            }).then((response) => {
              expect(response.status).to.eq(200)
            })
          })
        })
    });
  }
})

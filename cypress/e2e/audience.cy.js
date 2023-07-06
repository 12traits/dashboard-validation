describe('Dashboard', () => {
  beforeEach(() => {
    cy.login()
    cy.dashboard(Cypress.env('GAME_NAME'))
  })

  it('should create new Male only segment', () => {
    const filter = { "title": "Solsten Admin test", "description": "", "filters": [{ "type": "trait", "traits": ["D1_1"] }, { "key": "D2_1", "numeric_values": [{ "min": 30, "max": 50 }], "type": "trait" }], "parent_id": null }

    cy.request({
      method: 'POST',
      url: `${Cypress.env('GATEWAY')}/core/v1/segments`,
      body: filter,
      headers: {
        authorization: `Bearer ${localStorage.getItem('gameToken')}`,
        accept: 'application/json',
      },
    })
      .then((response) => {
        expect(response.status).to.eq(201);
      });
  });
})
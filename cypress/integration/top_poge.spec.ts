describe('Check text', () => {
  it('check text', () => {
    cy.visit('/top')

    // code タグ内にテキストが存在することを確認する
    cy.getBySel('greeting').should('contain', 'Welcome to Top')
  })
})

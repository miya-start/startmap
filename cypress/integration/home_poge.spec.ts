describe('Check text', () => {
  it('check text', () => {
    cy.visit('/')

    // code タグ内にテキストが存在することを確認する
    cy.contains('h1', 'Welcome to Remix')
  })
})

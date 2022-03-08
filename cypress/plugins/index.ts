import dotenv from 'dotenv'

dotenv.config({ path: '.env.test' })

export default (
  on: Cypress.PluginEvents,
  config: Cypress.PluginConfigOptions
) => {
  const configOverrides: Partial<Cypress.PluginConfigOptions> = {
    viewportWidth: 1030,
    viewportHeight: 800,
    video: !process.env.CI,
    screenshotOnRunFailure: !process.env.CI,
  }
  Object.assign(config, configOverrides)

  on('task', {
    async 'db:seed'() {
      console.log('db:seed', process.env.NODE_ENV)
      return null
    },
  })

  return config
}

const Hapi = require('hapi')
const dotenv = require('dotenv')
const { contactRoutes } = require('./routes')
const corsHeaders = require('hapi-cors-headers')

dotenv.config()

const server = new Hapi.Server({
  port: process.env.PORT,
  host: process.env.HOST,
  routes: {
    cors: {
      origin: ['http://localhost:3000']
    }
  }
})

const provision = async () => {
  await server.register({
    plugin: contactRoutes,
    routes: {
      prefix: '/api'
    }
  })

  // await server.ext('onPreResponse', corsHeaders)

  await server.start()
  console.log(`Server running at ${server.info.address}`)
}

provision()

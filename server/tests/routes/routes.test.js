const axios = require('axios');
const Hapi = require('hapi');
const { contactRoutes } = require('../../src/routes');
const { Database, Model } = require('mongorito')

class Contact {}
Contact.prototype = Object.create(Model.prototype)

let server;

describe('Routes: ', () => {
  beforeAll(async () => {
    return new Promise((resolve) => {
      server = new Hapi.Server({
        port: 15000,
        host: '0.0.0.0',
        routes: {
          cors: true
        }
      })

      server.register({
        plugin: contactRoutes,
        routes: {
          prefix: '/api'
        }
      }).then(() => {
        server.start()
        resolve()
      })
    })
  })

  afterAll(() => {
    Contact.remove({})
  });

  test('create: ', async () => {
    try {
      const response = await axios.post('http://0.0.0.0:15000/api/contacts', { lastName:'Test', firstName: 'eddu', contactNumber: '1099767623'})

      expect(response.data.status).toEqual('Contact created')
    } catch(e) {
      console.log(e)
    }
  })
});

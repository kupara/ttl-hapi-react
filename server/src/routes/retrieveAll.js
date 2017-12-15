const Boom = require('boom')
const Contact = require('../handlers/contactsManager')
const contact = new Contact(process.env.MONGO_TEST_DB)

module.exports = {
  method: 'GET',
  path: '/contacts',
  config: {
    handler: async (req, reply) => {
      try {
        return await contact.retrieveAll()
      } catch(e) {
        console.log(e)
        return Boom.notFound(e)
      }
    },
  }
}

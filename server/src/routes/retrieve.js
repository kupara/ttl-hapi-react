const Boom = require('boom')
const Contact = require('../handlers/contactsManager')
const contact = new Contact(process.env.MONGO_URL)

module.exports = {
  method: 'GET',
  path: '/contacts/{number}',
  config: {
    handler: async (req, reply) => {
      try {
        const { number } = req.params
        return await contact.retrieve({ number })
      } catch(e) {
        console.log(e)
        return Boom.notFound(e)
      }
    },
  }
}

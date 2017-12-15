const Boom = require('boom')

const Contact = require('../handlers/contactsManager')
const contact = new Contact(process.env.MONGO_TEST_DB)

module.exports = {
  method: 'DELETE',
  path: '/contacts/{contactNumber}',
  config: {
    handler: async (req, reply) => {
      try {
        const { contactNumber } = req.params
        return await contact.delete({ contactNumber })
      } catch(e) {
        console.log(e)
        return Boom.badImplementation(e)
      }
    },

  }
}

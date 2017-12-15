const Joi = require('joi')
const Boom = require('boom')

const Contact = require('../handlers/contactsManager')
const contact = new Contact(process.env.MONGO_URL)

module.exports = {
  method: ['PUT', 'OPTIONS'],
  path: '/contacts/{oldNumber}',
  config: {
    handler: async (req, reply) => {
      try {
        const { oldNumber } = req.params
        const data = req.payload
        return await contact.update(oldNumber, data)
      } catch(e) {
        console.log(e)
        return Boom.notFOUND(e)
      }
    },
    validate: {
      payload: {
        contactNumber: Joi.string().regex(/^[\+0-9]{8,16}$/),
        firstName: Joi.string(),
        lastName: Joi.string(),
      },
    },
  }
}

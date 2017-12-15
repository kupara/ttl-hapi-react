const Joi = require('joi')
const Boom = require('boom')
const randomAvatar = require('random-avatar')

const Contact = require('../handlers/contactsManager')
const contact = new Contact(process.env.MONGO_URL)

module.exports = {
  method: 'POST',
  path: '/contacts',
  config: {
    handler: async(req, h) => {
      try {
        const avatarUrl = `https:${randomAvatar()}`
        const res = await contact.create({...req.payload, avatarUrl })
        return res
      } catch (e) {
        console.log('Error', e)
        return Boom.badRequest(e)
      }
    },
    validate: {
      payload: {
        contactNumber: Joi.string().regex(/^[\+0-9]{8,16}$/).required().min(6),
        firstName: Joi.string().required().min(3),
        lastName: Joi.string().required().min(3),
      },
    },
  },
}

const { Database, Model } = require('mongorito')

class Contact extends Model {}

class ContactManager {
  constructor(mongoUrl) {
    this.dbUrl = mongoUrl
    this.ready = false
    this.init()
  }

  async init () {
    try {
      const db = new Database(this.dbUrl)
      await db.connect()
      db.register(Contact)
      this.ready = true
    } catch (e) {
      console.log(e)
    }
  }

  async create(contact) {
    if (!this.ready) await this.init()
    const { contactNumber } = contact

    const duplicate = await Contact.findOne({ contactNumber })
    if (duplicate)  throw new Error('Number already exists')

    const _contact = new Contact(contact)
    await _contact.save()
    return {
      status: 'Contact created'
    }
  }



  async retrieve(contact) {
    if (!this.ready) await this.init()

    const { contactNumber } = contact
    const record = await Contact.findOne({ contactNumber })
    if (!record) {
      throw new Error('No number was found')
    } else {
      return record
    }
  }

  async retrieveAll() {
    if (!this.ready) await this.init()


    const records = await Contact.include(['contactNumber', 'firstName', 'lastName']).find({})
    if (!records) {
      throw new Error('No records were found')
    } else {
      return records
    }
  }

  async update(oldNumber, _contact) {
    if (!this.ready) await this.init()

    const contact = await Contact.findOne({ contactNumber: oldNumber })
    if (!contact)  throw new Error('No number was found')

    contact.set(_contact)
    await contact.save()
    return {
      status: 'Contact updated'
    }
  }

  async delete(_contact) {
    if (!this.ready) await this.init()

    const { contactNumber } = _contact

    const contact = await Contact.findOne({ contactNumber })
    if (!contact)  throw new Error('No number was found')

    await contact.remove()
    return {
      status: 'Contact deleted'
    }
  }
}

module.exports = ContactManager

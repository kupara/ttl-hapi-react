const ContactsManager = require('../../src/handlers/contactsManager');

describe('Contact Manager: ', () => {
  let contactsManager;
  beforeAll(() => {
    contactsManager = new ContactsManager(process.env.MONGO_TEST_DB)
  });

  test('contact manager runs successfully', () => {
    expect(contactsManager).toBeTruthy();
  })

  test('can create contact', async () => {
    const response = await contactsManager.create({number: '211', name: 'One'})

    expect(response.status).toEqual('Contact created');
    contactsManager.clearAll()
  })
});

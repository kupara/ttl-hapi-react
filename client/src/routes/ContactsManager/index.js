import React, { Component } from 'react'
import ContactView from './components/ContactView'
import NewContact from './components/NewContact'
import UpdateForm from './components/UpdateForm'
import { DialogContainer, Snackbar } from 'react-md'
import * as ContactsApi from '../../api/api'
import { stripEmptyFields } from '../../utils/utils'

const defaultContact = {
  firstName: '',
  lastName: '',
  contactNumber: '',
}

const styles = {
  grid: {
    display: 'grid',
    width: '100%',
    height: '100vh',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gridTemplateRows: 'repeat(4, 1fr)',
  },
  cellContact : {
    marginTop: '10px',
    width: '100%',
    gridColumn: '2/3'
  }
}

class ContactManager extends Component {
  constructor(props) {
    super(props)
    this.state = {
      toasts: [],
      contacts: [],
      errors: {
        number: null,
      },
      newContact: defaultContact,
      updatedContact: defaultContact,
      activeContact: defaultContact,
      modalOpened: false,
    }
  }

  componentDidMount() {
    ContactsApi.fetchContacts().then(this.updateContacts)
  }

  updateContacts = (res) => {
    const { data: contacts } = res
    this.setState({ contacts })
  }

  updateToasts = (res) => {
    const { status } = res.data
    this.setState(state => {
      const toasts = state.toasts.slice()
      toasts.push({ text: status })
      return {
        toasts
      }
    }, () => {
      ContactsApi.fetchContacts().then(this.updateContacts)
    })
  }

  handleChange = (value, event) => {
    const { name } = event.target
    this.setState({
      newContact: {
        ...this.state.newContact,
        [name]: value
      }
    })
  }

  handleUpdate = (value, event) => {
    const { name } = event.target
    this.setState({
      updatedContact: {
        ...this.state.updatedContact,
        [name]: value
      }
    })
  }

  dismissToast = () => {
    const [, ...toasts] = this.state.toasts
    this.setState({ toasts })
  }

  validator = (input, isReq = false) => {
    if (isReq || input.length > 0) {
      return (/\d{1,15}$/.test(input))
    } else{
      return true
    }
  }

  createContact = () => {
    const { firstName, lastName, contactNumber } = this.state.newContact

    if (this.validator(contactNumber, true)) {
      ContactsApi.createContact({firstName, lastName, contactNumber}).then(res => {
        this.updateToasts(res)
        this.setState({
          errors: {
            number: null,
            update: null,
          },
          newContact: defaultContact,
        })
      })
    } else {
      this.setState({
        errors: {
          number: 'Number invalid'
        }
      })
    }

  }

  updateContact = (oldNumber) => {
    const { contactNumber } = this.state.updatedContact
    const strippedData = stripEmptyFields(this.state.updatedContact)

    if (Object.keys(strippedData).length > 0 && this.validator(contactNumber)) {
      ContactsApi.updateContact(oldNumber, strippedData).then(res => {
        this.updateToasts(res)
        this.hideUpdateModal()
        this.setState({
          errors: {
            update: null,
          }
        })
      })
    } else {
      this.setState({
        errors: {
          update: 'Number invalid',
        }
      })
    }
  }

  deleteContact = (number) => {
    ContactsApi.deleteContact(number).then(res => {
      this.updateToasts(res)
    })
  }

  openUpdateModal = (contact) => {
    this.setState({
      activeContact: contact,
      modalOpened: true
    })
  }

  hideUpdateModal = () => {
    this.setState({
      updatedContact: defaultContact,
      modalOpened: false
    })
  }

  render() {
    const { activeContact, newContact, contacts, toasts, errors, updatedContact, modalOpened } = this.state

    return (
      <div style={styles.grid}>
        <div style={styles.cellContact}>
          <NewContact errors={errors} initialData={newContact} contact={newContact} handleChange={this.handleChange} createContact={this.createContact} buttonLabel={'Create'}/>
        </div>
        <div style={styles.cellContact}>
          {contacts.map((contact, i) => (
            <ContactView
              key={i}
              contact={contact}
              modalOpened={modalOpened}
              handleChange={this.handleChange}
              handleUpdate={this.handleUpdate}
              updateContact={this.updateContact}
              deleteContact={this.deleteContact}
              updatedContact={updatedContact}
              openUpdateModal={this.openUpdateModal}
              hideUpdateModal={this.hideUpdateModal}
            />)
          )}
        </div>
        <DialogContainer
          id='update-dialog'
          aria-label='update-dialog'
          visible={modalOpened}
          onHide={this.hideUpdateModal}
          width='555px'
        >
          <UpdateForm errors={errors} handleChange={this.handleUpdate} initialData={activeContact} contact={updatedContact} updateContact={this.updateContact} buttonLabel={'Update'}/>
        </DialogContainer>
        <Snackbar
          id='snackbar'
          toasts={toasts}
          autohide
          onDismiss={this.dismissToast}
        />
      </div>
    )
  }
}

export default ContactManager

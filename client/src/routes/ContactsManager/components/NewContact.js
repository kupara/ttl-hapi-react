import React from 'react'
import PropTypes from 'prop-types'
import { Paper } from 'react-md'
import { Button, FontIcon, TextField } from 'react-md'

const styles = {
  paper: {
    padding: '16px',
  }
}

const NewContact = ({ buttonLabel, errors, contact, initialData, handleChange, createContact}) => (
  <Paper zDepth={2}
    className='md-block'
    style={styles.paper}
  >
    <TextField
      id='contact-name'
      label='First Name'
      name='firstName'
      lineDirection='center'
      onChange={handleChange}
      placeholder={initialData.firstName}
      value={contact.firstName}
      leftIcon={<FontIcon>face</FontIcon>}
    />
    <TextField
      id='contact-name'
      label='Last Name'
      name='lastName'
      lineDirection='center'
      onChange={handleChange}
      placeholder={initialData.lastName}
      value={contact.lastName}
      leftIcon={<FontIcon>face</FontIcon>}
    />
    <TextField
      id='phone-number-with-icon-right'
      label='Phone'
      name='contactNumber'
      onChange={handleChange}
      placeholder={initialData.contactNumber}
      value={contact.contactNumber}
      leftIcon={<FontIcon>phone</FontIcon>}
      size={10}
    />
    { errors.number && <div style={{color: 'red', textAlign: 'right'}}>Check the number input</div> }
    <br/>
    <Button
     raised
     primary
     onClick={createContact}
     iconEl={<FontIcon>add</FontIcon>}>{buttonLabel}</Button>
  </Paper>
)

NewContact.propTypes = {
  contact: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    number: PropTypes.string,
  }),
  handleChange: PropTypes.func.isRequired,
}

NewContact.defaultProps = {
  contact: {
    firstName: '',
    lastName: '',
    number: '',
  },
  errors: {
    number: null
  }
}

export default NewContact

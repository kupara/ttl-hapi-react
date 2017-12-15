import React from 'react'
import PropTypes from 'prop-types'
import { Button, FontIcon, TextField } from 'react-md'

const styles = {
  pad: {
    padding: '10px 0'
  }
}

const UpdateContact = ({ buttonLabel, errors, contact, initialData, handleChange, updateContact}) => (
  <div className='md-block' >
    <TextField
      style={styles.pad}
      id='contact-name'
      name='firstName'
      lineDirection='center'
      onChange={handleChange}
      placeholder={initialData.firstName}
      value={contact.firstName}
      leftIcon={<FontIcon>face</FontIcon>}
    />
    <TextField
      style={styles.pad}
      id='contact-name'
      name='lastName'
      lineDirection='center'
      onChange={handleChange}
      placeholder={initialData.lastName}
      value={contact.lastName}
      leftIcon={<FontIcon>face</FontIcon>}
    />
    <TextField
      style={styles.pad}
      id='phone-number-with-icon-right'
      name='contactNumber'
      onChange={handleChange}
      placeholder={initialData.contactNumber}
      value={contact.contactNumber}
      leftIcon={<FontIcon>phone</FontIcon>}
      size={10}
    />
    { errors.update && <div style={{color: 'red', textAlign: 'right'}}>Check your inputs</div> }
    <br/>
    <Button
     raised
     primary
     onClick={() => updateContact(initialData.contactNumber)}
     iconEl={<FontIcon>add</FontIcon>}>{buttonLabel}</Button>
  </div>
)

UpdateContact.propTypes = {
  contact: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    contactNumber: PropTypes.string,
  }),
  handleChange: PropTypes.func.isRequired,
}

UpdateContact.defaultProps = {
  contact: {
    firstName: '',
    lastName: '',
    contactNumber: '',
  },
  errors: {
    number: null
  }
}

export default UpdateContact

import React from 'react'
import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardTitle,
} from 'react-md'

import PropTypes from 'prop-types'

const style = { marginTop: '10px', maxWidth: 600 }

const ContactView = ({
  contact,
  deleteContact,
  handleChange,
  handleUpdate,
  key,
  modalOpened,
  openUpdateModal,
  updateContact,
  updatedContact,
}) => (
  <div>
   <Card style={style} className="md-block-centered">
    <CardTitle
      title={`${contact.firstName} ${contact.lastName}`}
      subtitle={contact.contactNumber}
      avatar={<Avatar src={contact.avatarUrl}/>}
    />
    <CardActions>
      <Button
        primary
        flat
        onClick={()=> openUpdateModal(contact)}
        >
        Update
      </Button>
      <Button
        secondary
        flat
        onClick={() => {
          deleteContact(contact.contactNumber)
        }}
        >
        Delete
      </Button>
    </CardActions>
  </Card>
  </div>
)

ContactView.propTypes = {
  contact: PropTypes.shape({
    name: PropTypes.string,
    contactNumber: PropTypes.string,
    avatarUrl: PropTypes.string,
  }),
  handleChange: PropTypes.func.isRequired,
  deleteContact: PropTypes.func.isRequired,
}

export default ContactView

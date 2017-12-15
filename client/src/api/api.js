import axios from 'axios'
const axiosInstance = axios.create({
  baseURL: 'http://localhost:3001',
})

export async function fetchContacts() {
  return await axiosInstance.get('/api/contacts')
}

export async function createContact(data) {
  const { firstName, lastName, contactNumber } = data

  return await axiosInstance.post('/api/contacts', { firstName, lastName, contactNumber })
}

export async function updateContact(oldNumber, data) {
  return await axiosInstance.put(`/api/contacts/${oldNumber}`,  data)
}

export async function deleteContact(number) {
  return await axiosInstance.delete(`/api/contacts/${number}`)
}

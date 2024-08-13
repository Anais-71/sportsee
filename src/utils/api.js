// utils/api.js
import axios from 'axios'
import {
  USER_MAIN_DATA,
  USER_ACTIVITY,
  USER_AVERAGE_SESSIONS,
  USER_PERFORMANCE,
} from '../data'

/**
 * Fetches user data from the API.
 * @param {number|string} id - The user ID.
 * @param {boolean} isMock - Flag to indicate if mock data should be used.
 * @returns {Promise<Object>} The user data.
 */
export const getUser = async (id, isMock) => {
  if (isMock) {
    const user = USER_MAIN_DATA.find((user) => user.id === parseInt(id))
    if (user) {
      return { data: user }
    } else {
      throw new Error('User not found')
    }
  }

  try {
    const response = await axios.get(`http://localhost:3000/user/${id}`)
    return response.data
  } catch (error) {
    console.error('Error fetching user data:', error)
    throw error
  }
}

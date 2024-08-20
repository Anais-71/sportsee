import axios from 'axios'
import User from './user'
import {
  USER_MAIN_DATA,
  // USER_ACTIVITY,
  // USER_AVERAGE_SESSIONS,
  // USER_PERFORMANCE,
} from '../data'

/**
 * Fetches user data from the API and returns a User instance.
 * @param {number|string} id - The user ID.
 * @param {boolean} isMock - Flag to indicate if mock data should be used.
 * @returns {Promise<User>} The User instance.
 */
export const getUser = async (id, isMock) => {
  if (!id) {
    console.error('User ID is not provided.')
    return null
  }

  let userData

  if (isMock) {
    const user = USER_MAIN_DATA.find((user) => user.id === parseInt(id))
    if (user) {
      userData = { data: user }
    } else {
      throw new Error('User not found')
    }
  } else {
    try {
      const response = await axios.get(`http://localhost:3000/user/${id}`)
      userData = response.data
    } catch (error) {
      console.error('Error fetching user data:', error)
      throw error
    }
  }

  console.log('Received user data:', userData) // <--- Ajoutez cette ligne

  // Create an instance of the User class with the fetched data
  return new User(userData)
}

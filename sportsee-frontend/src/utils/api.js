import axios from 'axios'
import User from './user'
import {
  USER_MAIN_DATA,
  USER_ACTIVITY,
  USER_AVERAGE_SESSIONS,
  USER_PERFORMANCE,
} from '../mockData'

/**
 * Fetches user data by ID.
 *
 * @param {number} id - The ID of the user.
 * @param {boolean} isMock - Determines if mock data should be used.
 * @returns {Promise<User|null>} A promise that resolves to a User instance or null if no ID is provided.
 * @throws {Error} Throws an error if the user is not found or there is a problem with the request.
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
      // Harmonize the score key
      if (user.todayScore !== undefined) {
        user.score = user.todayScore
        delete user.todayScore
      }
      userData = { data: user }
    } else {
      throw new Error('User not found')
    }
  } else {
    try {
      const response = await axios.get(`http://localhost:3000/user/${id}`)
      const user = response.data.data

      // Harmonize the score key
      if (user.todayScore !== undefined) {
        user.score = user.todayScore
        delete user.todayScore
      }

      userData = { data: user }
    } catch (error) {
      console.error('Error fetching user data:', error)
      throw error
    }
  }

  return new User(userData)
}

/**
 * Fetches user activity data by ID.
 *
 * @param {number} id - The ID of the user.
 * @param {boolean} isMock - Determines if mock data should be used.
 * @returns {Promise<Object|null>} A promise that resolves to the user's activity data or null if no ID is provided.
 * @throws {Error} Throws an error if the activity data is not found or there is a problem with the request.
 */
export const getUserActivity = async (id, isMock) => {
  if (!id) {
    console.error('User ID is not provided.')
    return null
  }

  let activityData

  if (isMock) {
    const activity = USER_ACTIVITY.find(
      (activity) => activity.userId === parseInt(id),
    )
    if (activity) {
      activityData = { sessions: activity.sessions }
    } else {
      throw new Error('Activity data not found')
    }
  } else {
    try {
      const response = await axios.get(
        `http://localhost:3000/user/${id}/activity`,
      )
      activityData = response.data.data
    } catch (error) {
      console.error('Error fetching activity data:', error)
      throw error
    }
  }

  return activityData
}

/**
 * Fetches average session durations for the user by ID.
 *
 * @param {number} id - The ID of the user.
 * @param {boolean} isMock - Determines if mock data should be used.
 * @returns {Promise<Object|null>} A promise that resolves to the user's average sessions data or null if no ID is provided.
 * @throws {Error} Throws an error if the sessions data is not found or there is a problem with the request.
 */
export const getUserAverageSessions = async (id, isMock) => {
  if (!id) {
    console.error('User ID is not provided.')
    return null
  }

  let sessionsData

  if (isMock) {
    const userSessions = USER_AVERAGE_SESSIONS.find(
      (user) => user.userId === parseInt(id),
    )
    if (userSessions) {
      sessionsData = userSessions.sessions
    } else {
      throw new Error('Sessions data not found')
    }
  } else {
    try {
      const response = await axios.get(
        `http://localhost:3000/user/${id}/average-sessions`,
      )
      sessionsData = response.data.data.sessions
    } catch (error) {
      console.error('Error fetching sessions data:', error)
      throw error
    }
  }

  return sessionsData
}

/**
 * Fetches the user's performance data by ID.
 *
 * @param {number} id - The ID of the user.
 * @param {boolean} isMock - Determines if mock data should be used.
 * @returns {Promise<Object|null>} A promise that resolves to the user's performance data or null if no ID is provided.
 * @throws {Error} Throws an error if the performance data is not found or there is a problem with the request.
 */
export const getUserPerformance = async (id, isMock) => {
  if (!id) {
    console.error('User ID is not provided.')
    return null
  }

  let performanceData

  const subjectMapping = {
    cardio: 'Cardio',
    energy: 'Énergie',
    endurance: 'Endurance',
    strength: 'Force',
    intensity: 'Intensité',
    speed: 'Vitesse',
  }

  if (isMock) {
    const performance = USER_PERFORMANCE.find(
      (performance) => performance.userId === parseInt(id),
    )
    if (performance) {
      performanceData = performance.data
        .filter((item) => subjectMapping[performance.kind[item.kind]] !== null)
        .map((item) => ({
          subject: subjectMapping[performance.kind[item.kind]],
          value: item.value,
        }))
    } else {
      throw new Error('Performance data not found')
    }
  } else {
    try {
      const response = await axios.get(
        `http://localhost:3000/user/${id}/performance`,
      )
      const { data, kind } = response.data.data
      performanceData = data
        .filter((item) => subjectMapping[kind[item.kind]] !== null)
        .map((item) => ({
          subject: subjectMapping[kind[item.kind]],
          value: item.value,
        }))
    } catch (error) {
      console.error('Error fetching performance data:', error)
      throw error
    }
  }

  return performanceData
}

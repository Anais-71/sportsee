import React, { useState, useEffect } from 'react'
import './dashboard.css'
import { User } from '../utils/user'
import { getUser } from '../utils/api'

/**
 * Dashboard component
 */
const Dashboard = ({ id, navigate, isMock }) => {
  const [user, setUser] = useState({
    user: null,
  })

  useEffect(() => {
    /**
     * Fetches user data and updates the state.
     * @async
     * @function getDatas
     * @returns {Promise<void>}
     */
    async function getDatas() {
      try {
        const userDatas = await getUser(id, isMock)
        const userModel = new User(userDatas)
        setUser({
          user: userModel,
        })
      } catch (error) {
        console.error('Error:', error)
      }
    }

    getDatas()
  }, [id, navigate, isMock])

  return (
    <div className="main">
      <div className="title">
        <div className="title__welcome">
          Bonjour{' '}
          <span className="title__welcome--name">
            {user.user ? user.user.firstName : 'Utilisateur'}
          </span>
        </div>
        <div className="title__subtitle">
          Félicitations, vous avez explosé vos objectifs hier
        </div>
      </div>
    </div>
  )
}

export default Dashboard

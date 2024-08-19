import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom' // Importer useParams
import './dashboard.css'
import { getUser } from '../../utils/api'

/**
 * Dashboard component
 */
const Dashboard = ({ isMock }) => {
  const { id } = useParams() // Récupérer l'ID de l'utilisateur depuis l'URL
  const [user, setUser] = useState(null)

  useEffect(() => {
    /**
     * Fetches user data and updates the state.
     * @async
     * @function getDatas
     * @returns {Promise<void>}
     */
    async function getDatas() {
      try {
        const userModel = await getUser(id, isMock)
        setUser(userModel)
      } catch (error) {
        console.error('Error:', error)
      }
    }

    getDatas()
  }, [id, isMock])

  return (
    <div className="main">
      <div className="title">
        <div className="title__welcome">
          Bonjour{' '}
          <span className="title__welcome--name">
            {user ? user.firstName : 'Utilisateur'}
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

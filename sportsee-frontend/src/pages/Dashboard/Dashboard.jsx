import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import './dashboard.css'
import { getUser } from '../../utils/api'
import Figure from '../../components/figure/Figure'

//icons
import caloriesIcon from '../../assets/icons/calories-icon.png'
import proteinIcon from '../../assets/icons/protein-icon.png'
import carbsIcon from '../../assets/icons/carbs-icon.png'
import fatIcon from '../../assets/icons/fat-icon.png'

/**
 * Dashboard component that displays a welcome message to the user
 * and congratulates them on achieving their goals.
 *
 * @param {Object} props - The properties passed to the component.
 * @param {boolean} props.isMock - Determines whether to use mock data or fetch real data.
 * @returns {JSX.Element} The rendered Dashboard component.
 */
const Dashboard = ({ isMock }) => {
  const { id } = useParams() // Retrieve the user ID from the URL
  const [user, setUser] = useState(null) // State to store user data

  useEffect(() => {
    /**
     * Fetches user data and updates the state.
     * Logs an error to the console if the fetch fails.
     *
     * @async
     * @function getDatas
     * @returns {Promise<void>} A promise that resolves when the user data is fetched and state is updated.
     */
    async function getDatas() {
      try {
        const userModel = await getUser(id, isMock) // Fetch user data from the API
        setUser(userModel) // Update state with the fetched user data
      } catch (error) {
        console.error('Error:', error) // Log an error if the data fetch fails
      }
    }

    getDatas() // Call the function to fetch user data
  }, [id, isMock]) // Dependencies for useEffect: runs whenever id or isMock changes

  // Check if user data is available before accessing the user's stats
  const figuresData = user
    ? [
        {
          title: 'Calories',
          nb: `${user.calorieCount || 0}kCal`, // Default to 0 if undefined
          imageSrc: caloriesIcon,
        },
        {
          title: 'Protéines',
          nb: `${user.proteinCount || 0}g`,
          imageSrc: proteinIcon,
        },
        {
          title: 'Glucides',
          nb: `${user.carbohydrateCount || 0}g`,
          imageSrc: carbsIcon,
        },
        {
          title: 'Lipides',
          nb: `${user.lipidCount || 0}g`,
          imageSrc: fatIcon,
        },
      ]
    : [] // Return an empty array if user data is not available

  return (
    <div className="main">
      <div className="title">
        <div className="title__welcome">
          Bonjour{' '}
          <span className="title__welcome--name">
            {user ? user.firstName : ' '}
            {/* Display the user's first name if available, otherwise show white space */}
          </span>
        </div>
        <div className="title__subtitle">
          Félicitation ! Vous avez explosé vos objectifs hier 👏{' '}
        </div>
      </div>
      <div className="content">
        <div className="graphs">
          <div className="graphs__main">TEST</div>
          <div className="graphs__sub">TEST</div>
        </div>
        <div className="figures">
          {figuresData.map((figure, index) => (
            <Figure
              key={index}
              title={figure.title}
              nb={figure.nb}
              imageSrc={figure.imageSrc}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Dashboard

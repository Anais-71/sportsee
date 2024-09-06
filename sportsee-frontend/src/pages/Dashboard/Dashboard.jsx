import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import {
  getUser,
  getUserActivity,
  getUserAverageSessions,
  getUserPerformance,
} from '../../utils/api'

//css
import './dashboard.css'

//icons
import caloriesIcon from '../../assets/icons/calories-icon.png'
import proteinIcon from '../../assets/icons/protein-icon.png'
import carbsIcon from '../../assets/icons/carbs-icon.png'
import fatIcon from '../../assets/icons/fat-icon.png'

//components
import Figure from '../../components/figure/Figure'
import BarChartComponent from '../../components/graphs/bars/Bars'
import LinesChartComponent from '../../components/graphs/lines/Lines'
import RadarChartComponent from '../../components/graphs/radar/Radar'
import GaugeChartComponent from '../../components/graphs/gauge/Gauge'

const Dashboard = ({ isMock }) => {
  const { id } = useParams() // Retrieve the user ID from the URL
  const [user, setUser] = useState(null) // State to store user data
  const [activity, setActivity] = useState(null) // State to store user activity data
  const [sessions, setSessions] = useState(null) // State to store user sessions data
  const [performance, setPerformance] = useState(null) // State to store user performances

  useEffect(() => {
    async function getDatas() {
      try {
        const userModel = await getUser(id, isMock)
        setUser(userModel)

        const activityData = await getUserActivity(id, isMock)
        setActivity(activityData)

        const sessionsData = await getUserAverageSessions(id, isMock)
        setSessions(sessionsData)

        const performanceData = await getUserPerformance(id, isMock)
        setPerformance(performanceData)
      } catch (error) {
        console.error('Error:', error)
      }
    }

    getDatas()
  }, [id, isMock])

  const figuresData = user
    ? [
        {
          title: 'Calories',
          nb: `${user.calorieCount || 0}kCal`,
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
          </span>
        </div>
        <div className="title__subtitle">
          Félicitation ! Vous avez explosé vos objectifs hier 👏{' '}
        </div>
      </div>
      <div className="content">
        <div className="graphs">
          <div className="graphs__main">
            {activity ? <BarChartComponent data={activity} /> : 'Loading...'}{' '}
            {/* Pass activity data to BarChart */}
          </div>

          <div className="graphs__sub">
            <div className="graphs__sub--lines">
              {sessions ? (
                <LinesChartComponent data={sessions} />
              ) : (
                'Loading...'
              )}{' '}
              {/* Pass session data to LineChart */}
            </div>

            <div className="graphs__sub--radar">
              {performance ? (
                <RadarChartComponent data={performance} />
              ) : (
                'Loading...'
              )}{' '}
              {/* Pass session data to RadarChart */}
            </div>

            <div className="graphs__sub--gauge">
              {user ? <GaugeChartComponent data={user} /> : 'Loading...'}{' '}
            </div>
          </div>
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

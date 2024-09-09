import React from 'react'
import { useNavigate } from 'react-router-dom'

import './home.css'

function Home() {
  const navigate = useNavigate()

  const user12 = () => {
    navigate('/user/12')
  }

  const user18 = () => {
    navigate('/user/18')
  }

  return (
    <div className="home">
      <button className="home__karl" onClick={user12}>
        Karl
      </button>
      <button className="home__cecilia" onClick={user18}>
        Cécilia
      </button>
    </div>
  )
}

export default Home

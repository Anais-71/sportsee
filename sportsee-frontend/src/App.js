import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Dashboard from './pages/Dashboard/Dashboard.jsx'
import Home from './pages/Home/Home.jsx'
import Layout from './layout/Layout.jsx'

function App() {
  console.log(process.env.REACT_APP_ENV)
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/user/:id" element={<Dashboard />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App

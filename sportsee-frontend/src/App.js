import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Dashboard from './pages/Dashboard/Dashboard.jsx'
import Layout from './layout/Layout.jsx'

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/user/:id" element={<Dashboard />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Dashboard from './src/pages/Dashboard'
import Layout from './src/layout/Layout.jsx'
import Dashboard from './src/pages/Dashboard'

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

import React from 'react'

// Components
import Header from '../components/header/Header'
import Sidebar from '../components/sidebar/Sidebar'

export default function Layout({ children }) {
  return (
    <>
      <Header />
      {children}
      <Sidebar />
    </>
  )
}

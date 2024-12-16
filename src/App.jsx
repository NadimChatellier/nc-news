import { useState } from 'react'
import Header from './Header'
import { Route, Routes} from 'react-router-dom'
import './App.css'

function App() {

  return (
    <>
      <div className="header-container">
      <Header />
      {/* <PFP /> */}
    </div>
    <Routes>
      <Route path="/" element={<Articles />} />
    </Routes>
   
    </>
  )
}

export default App

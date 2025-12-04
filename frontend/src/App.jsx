import { Routes, Route } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Pillars from './pages/Pillars'
import Journey from './pages/Journey'
import Community from './pages/Community'
import Contact from './pages/Contact'
import Scenarios from './pages/Scenarios'
import Mascot from './components/Mascot'
import RecycleGame from './components/RecycleGame'
import { EasterEggProvider } from './hooks/useEasterEggs'

function App() {
  return (
    <EasterEggProvider>
      <div className="app">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/pillars" element={<Pillars />} />
            <Route path="/journey" element={<Journey />} />
            <Route path="/scenarios" element={<Scenarios />} />
            <Route path="/community" element={<Community />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <Footer />
        <Mascot />
        <RecycleGame />
      </div>
    </EasterEggProvider>
  )
}

export default App

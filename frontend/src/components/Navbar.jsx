import { Link, useLocation } from 'react-router-dom'
import { useState } from 'react'
import { useEasterEggs } from '../hooks/useEasterEggs'
import './Navbar.css'

function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()
  const { toggleGauloisMode, isGauloisMode } = useEasterEggs()

  const navLinks = [
    { path: '/', label: 'Accueil' },
    { path: '/pillars', label: 'Les 3 Piliers' },
    { path: '/journey', label: 'Parcours' },
    { path: '/scenarios', label: 'Scénarios' },
    { path: '/community', label: 'Communauté' },
    { path: '/contact', label: 'Contact' }
  ]

  return (
    <nav className="navbar">
      <div className="container navbar-container">
        <Link to="/" className="logo" onClick={() => setIsOpen(false)}>
          <span className="logo-icon" title="Triple-clic pour mode Gaulois!" onClick={(e) => {
            if (e.detail === 3) {
              e.preventDefault()
              toggleGauloisMode()
            }
          }}>
            {isGauloisMode ? '⚔️' : '🏛️'}
          </span>
          <span className="logo-text">
            Village <span className="logo-highlight">NIRD</span>
          </span>
        </Link>

        <button className="menu-toggle" onClick={() => setIsOpen(!isOpen)} aria-label="Menu">
          <span className={`hamburger ${isOpen ? 'open' : ''}`}></span>
        </button>

        <ul className={`nav-links ${isOpen ? 'open' : ''}`}>
          {navLinks.map(link => (
            <li key={link.path}>
              <Link 
                to={link.path} 
                className={`nav-link ${location.pathname === link.path ? 'active' : ''}`}
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}

export default Navbar

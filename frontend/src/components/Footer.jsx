import { Link } from 'react-router-dom'
import { useEasterEggs } from '../hooks/useEasterEggs'
import './Footer.css'

function Footer() {
  const { clickCount, incrementClick } = useEasterEggs()

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-section">
            <h3 className="footer-title">🏛️ Village NIRD</h3>
            <p className="footer-desc">
              Ensemble, résistons à l'Empire numérique ! 
              Pour un numérique Inclusif, Responsable et Durable.
            </p>
            <div className="footer-links">
              <a href="https://nird.forge.apps.education.fr/" target="_blank" rel="noopener noreferrer">
                Site officiel NIRD
              </a>
            </div>
          </div>

          <div className="footer-section">
            <h4>Navigation</h4>
            <ul className="footer-nav">
              <li><Link to="/">Accueil</Link></li>
              <li><Link to="/pillars">Les 3 Piliers</Link></li>
              <li><Link to="/journey">Parcours</Link></li>
              <li><Link to="/community">Communauté</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Ressources</h4>
            <ul className="footer-nav">
              <li><a href="https://nird.forge.apps.education.fr/linux/" target="_blank" rel="noopener">Linux pour l'éducation</a></li>
              <li><a href="https://nird.forge.apps.education.fr/reconditionnement/" target="_blank" rel="noopener">Reconditionnement</a></li>
              <li><a href="https://nird.forge.apps.education.fr/collectivites/" target="_blank" rel="noopener">Collectivités</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Rejoindre</h4>
            <p className="footer-small">
              Vous souhaitez engager votre établissement dans la démarche NIRD ?
            </p>
            <Link to="/contact" className="btn btn-accent footer-btn">
              Nous contacter
            </Link>
          </div>
        </div>

        <div className="footer-bottom">
          <p 
            className="footer-copy hidden-easter" 
            onClick={incrementClick}
            data-secret={clickCount >= 5 ? "🐧 Linux vaincra !" : ""}
            style={{ position: 'relative' }}
          >
            © 2025 Village Numérique Résistant - Projet réalisé pour la Nuit de l'Info
          </p>
          <p className="footer-license">
            Production sous licence libre 🕊️
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer

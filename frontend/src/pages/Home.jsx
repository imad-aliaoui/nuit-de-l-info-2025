import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useEasterEggs } from '../hooks/useEasterEggs'
import './Home.css'

function Home() {
  const [stats, setStats] = useState(null)
  const { triggerMascot, isGauloisMode } = useEasterEggs()
  const [heroClicks, setHeroClicks] = useState(0)

  useEffect(() => {
    fetch('/api/stats')
      .then(res => res.json())
      .then(data => setStats(data))
      .catch(() => {
        setStats({
          computers_saved: 15000,
          co2_saved: 4500,
          money_saved: 7500000,
          schools_participating: 127
        })
      })
  }, [])

  const handleHeroClick = () => {
    setHeroClicks(prev => {
      const newCount = prev + 1
      if (newCount === 5) {
        triggerMascot("🎯 Vous avez trouvé un secret ! Essayez le code Konami pour un mini-jeu...")
        return 0
      }
      return newCount
    })
  }

  return (
    <div className="home">
      <section className="hero" onClick={handleHeroClick}>
        <div className="hero-bg">
          <div className="hero-village"></div>
        </div>
        <div className="container hero-content">
          <div className="hero-badge">
            {isGauloisMode ? '⚔️' : '🏛️'} Démarche NIRD
          </div>
          <h1 className="hero-title">
            Le Village Numérique <span className="highlight">Résistant</span>
          </h1>
          <p className="hero-subtitle">
            Face à l'Empire des Big Tech, les établissements scolaires deviennent des villages 
            ingénieux et autonomes. Rejoignez la résistance pour un numérique 
            <strong> Inclusif</strong>, <strong>Responsable</strong> et <strong>Durable</strong> !
          </p>
          <div className="hero-cta">
            <Link to="/journey" className="btn btn-primary">
              🚀 Commencer le parcours
            </Link>
            <Link to="/pillars" className="btn btn-secondary">
              📚 Découvrir NIRD
            </Link>
          </div>
        </div>
        <div className="hero-scroll">
          <span>Défiler</span>
          <div className="scroll-arrow"></div>
        </div>
      </section>

      <section className="section intro">
        <div className="container">
          <div className="intro-grid">
            <div className="intro-text">
              <h2>Pourquoi résister ?</h2>
              <p>
                À l'heure où la fin du support de Windows 10 menace de rendre obsolètes 
                des milliers d'ordinateurs encore fonctionnels, les établissements scolaires 
                font face à un choix crucial.
              </p>
              <p>
                <strong>Acheter du nouveau matériel ?</strong> Coûteux et polluant.<br/>
                <strong>Adopter Linux ?</strong> Économique, écologique et libérateur !
              </p>
              <p className="hidden-easter" data-secret="David > Goliath 💪" style={{ position: 'relative' }}>
                Comme David face à Goliath, comme Astérix face à l'Empire romain, 
                les établissements peuvent résister et reprendre le contrôle de leur destin numérique.
              </p>
            </div>
            <div className="intro-visual">
              <div className="versus-card">
                <div className="versus-side goliath">
                  <span className="versus-emoji">🏢</span>
                  <h4>Empire Big Tech</h4>
                  <ul>
                    <li>Obsolescence programmée</li>
                    <li>Licences coûteuses</li>
                    <li>Données hors UE</li>
                    <li>Dépendance totale</li>
                  </ul>
                </div>
                <div className="versus-separator">VS</div>
                <div className="versus-side david">
                  <span className="versus-emoji">🏛️</span>
                  <h4>Village NIRD</h4>
                  <ul>
                    <li>Matériel prolongé</li>
                    <li>Logiciels libres</li>
                    <li>Souveraineté</li>
                    <li>Autonomie retrouvée</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {stats && (
        <section className="section stats-section">
          <div className="container">
            <h2 className="section-title">L'impact de la démarche NIRD</h2>
            <div className="stats-grid">
              <div className="stat-card">
                <span className="stat-icon">💻</span>
                <span className="stat-number">{stats.computers_saved?.toLocaleString()}+</span>
                <span className="stat-label">Ordinateurs sauvés</span>
              </div>
              <div className="stat-card">
                <span className="stat-icon">🌍</span>
                <span className="stat-number">{stats.co2_saved?.toLocaleString()} T</span>
                <span className="stat-label">CO₂ économisé</span>
              </div>
              <div className="stat-card">
                <span className="stat-icon">💰</span>
                <span className="stat-number">{(stats.money_saved / 1000000).toFixed(1)}M €</span>
                <span className="stat-label">Économies réalisées</span>
              </div>
              <div className="stat-card">
                <span className="stat-icon">🏫</span>
                <span className="stat-number">{stats.schools_participating}+</span>
                <span className="stat-label">Établissements engagés</span>
              </div>
            </div>
          </div>
        </section>
      )}

      <section className="section pillars-preview">
        <div className="container">
          <h2 className="section-title">Les 3 piliers de NIRD</h2>
          <div className="pillars-grid">
            <div className="pillar-card inclusion">
              <div className="pillar-icon">👥</div>
              <h3>Inclusion</h3>
              <p>Accès équitable au numérique pour tous, réduction de la fracture numérique.</p>
              <Link to="/pillars" className="pillar-link">En savoir plus →</Link>
            </div>
            <div className="pillar-card responsabilite">
              <div className="pillar-icon">🛡️</div>
              <h3>Responsabilité</h3>
              <p>Usage raisonné, protection des données, souveraineté numérique.</p>
              <Link to="/pillars" className="pillar-link">En savoir plus →</Link>
            </div>
            <div className="pillar-card durabilite">
              <div className="pillar-icon">♻️</div>
              <h3>Durabilité</h3>
              <p>Lutte contre l'obsolescence, réemploi du matériel, Linux comme solution.</p>
              <Link to="/pillars" className="pillar-link">En savoir plus →</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section cta-section">
        <div className="container">
          <div className="cta-card">
            <h2>Prêt à rejoindre la résistance ?</h2>
            <p>
              Découvrez comment votre établissement peut devenir un village numérique résistant 
              grâce à notre parcours interactif.
            </p>
            <div className="cta-buttons">
              <Link to="/scenarios" className="btn btn-accent">
                🎮 Tester les scénarios
              </Link>
              <Link to="/community" className="btn btn-secondary">
                🤝 Rejoindre la communauté
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home

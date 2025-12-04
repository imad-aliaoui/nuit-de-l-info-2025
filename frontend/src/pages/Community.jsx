import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useEasterEggs } from '../hooks/useEasterEggs'
import './Community.css'

function Community() {
  const [actors, setActors] = useState([])
  const { triggerMascot } = useEasterEggs()

  useEffect(() => {
    fetch('/api/actors')
      .then(res => res.json())
      .then(data => setActors(data))
      .catch(() => {
        setActors([
          { id: 1, name: 'Élèves et éco-délégués', description: 'Acteurs principaux de la transition, ils participent aux projets de reconditionnement et sensibilisent leurs pairs.', icon: 'graduation-cap', role_type: 'student' },
          { id: 2, name: 'Enseignants', description: 'Porteurs de la démarche pédagogique, ils intègrent les outils libres dans leurs pratiques.', icon: 'chalkboard-teacher', role_type: 'teacher' },
          { id: 3, name: 'Directions d\'établissements', description: 'Décideurs clés pour engager l\'établissement dans la démarche NIRD.', icon: 'building', role_type: 'admin' },
          { id: 4, name: 'Techniciens réseaux', description: 'Experts techniques qui déploient Linux et maintiennent les équipements.', icon: 'tools', role_type: 'tech' },
          { id: 5, name: 'Collectivités territoriales', description: 'Partenaires essentiels pour le financement et l\'équipement des établissements.', icon: 'landmark', role_type: 'authority' },
          { id: 6, name: 'Associations partenaires', description: 'Clubs informatiques et associations du libre qui accompagnent la transition.', icon: 'handshake', role_type: 'partner' }
        ])
      })
  }, [])

  const getEmoji = (icon) => {
    const emojiMap = {
      'graduation-cap': '🎓',
      'chalkboard-teacher': '👩‍🏫',
      'building': '🏢',
      'tools': '🔧',
      'landmark': '🏛️',
      'handshake': '🤝'
    }
    return emojiMap[icon] || '👤'
  }

  const handleActorClick = (actor) => {
    if (actor.role_type === 'student') {
      triggerMascot("🌟 Les élèves sont au cœur de la démarche NIRD ! Au lycée Carnot, ils reconditionnent des PC pour les familles !")
    }
  }

  return (
    <div className="community-page">
      <section className="community-hero">
        <div className="container">
          <h1>🤝 Rejoindre la Communauté NIRD</h1>
          <p>
            La démarche NIRD fédère un réseau d'acteurs engagés pour transformer 
            le numérique éducatif. Ensemble, nous résistons à l'Empire Big Tech !
          </p>
        </div>
      </section>

      <section className="section actors-section">
        <div className="container">
          <h2 className="section-title">Les acteurs de la résistance</h2>
          <div className="actors-grid">
            {actors.map(actor => (
              <div 
                key={actor.id} 
                className="actor-card"
                onClick={() => handleActorClick(actor)}
              >
                <div className="actor-emoji">{getEmoji(actor.icon)}</div>
                <h3>{actor.name}</h3>
                <p>{actor.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section forge-section">
        <div className="container">
          <div className="forge-content">
            <div className="forge-text">
              <h2>🔨 La Forge des Communs Numériques Éducatifs</h2>
              <p>
                La démarche NIRD est portée par un <strong>collectif enseignant</strong> issu 
                de la Forge des communs numériques éducatifs, un projet soutenu par 
                la Direction du numérique pour l'éducation.
              </p>
              <p>
                C'est une <strong>initiative du terrain</strong>, dictée par un sentiment d'urgence 
                face à l'obsolescence programmée et la dépendance aux Big Tech.
              </p>
              <ul className="forge-features">
                <li>📂 Mutualisation des ressources libres</li>
                <li>🔄 Partage d'expériences entre établissements</li>
                <li>🛠️ Co-construction de solutions numériques</li>
                <li>📚 Documentation et guides pratiques</li>
              </ul>
              <a 
                href="https://nird.forge.apps.education.fr/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn btn-primary"
              >
                Visiter le site NIRD officiel →
              </a>
            </div>
            <div className="forge-visual">
              <div className="forge-logo-container">
                <div className="forge-icon">⚒️</div>
                <div className="forge-glow"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section pilots-section">
        <div className="container">
          <h2 className="section-title">Les établissements pilotes</h2>
          <p className="pilots-intro">
            Des établissements pionniers expérimentent déjà la démarche NIRD. 
            Ils montrent la voie vers l'autonomie numérique !
          </p>
          
          <div className="pilot-highlight">
            <div className="pilot-badge">🏆 Établissement pionnier</div>
            <h3>Lycée Carnot - Bruay-la-Buissière</h3>
            <p>
              Le projet NIRD est né dans ce lycée des Hauts-de-France. Les élèves 
              du club informatique reconditionnent des ordinateurs destinés à la 
              déchetterie pour les redistribuer aux familles et écoles du territoire.
            </p>
            <div className="pilot-stats">
              <div className="pilot-stat">
                <span className="stat-number">14</span>
                <span className="stat-label">PC reconditionnés pour une école primaire</span>
              </div>
              <div className="pilot-stat">
                <span className="stat-number">100%</span>
                <span className="stat-label">Satisfaction des familles équipées</span>
              </div>
            </div>
          </div>

          <div className="join-pilots">
            <h3>Votre établissement veut devenir pilote ?</h3>
            <p>
              Rejoignez le forum Tchap dédié pour échanger avec la communauté 
              et engager votre établissement dans la démarche.
            </p>
            <a 
              href="https://edurl.fr/tchap-laforgeedu-nird" 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn btn-accent"
            >
              💬 Rejoindre le forum Tchap
            </a>
          </div>
        </div>
      </section>

      <section className="section how-to-join">
        <div className="container">
          <h2 className="section-title">Comment participer ?</h2>
          <div className="join-steps">
            <div className="join-step">
              <div className="step-number">1</div>
              <h4>Découvrir</h4>
              <p>Explorez le site NIRD et imprégnez-vous de la démarche et de ses principes.</p>
            </div>
            <div className="join-step">
              <div className="step-number">2</div>
              <h4>Échanger</h4>
              <p>Rejoignez le forum Tchap pour discuter avec les membres du collectif.</p>
            </div>
            <div className="join-step">
              <div className="step-number">3</div>
              <h4>Expérimenter</h4>
              <p>Testez Linux sur quelques postes, organisez un premier atelier.</p>
            </div>
            <div className="join-step">
              <div className="step-number">4</div>
              <h4>Témoigner</h4>
              <p>Partagez votre expérience pour inspirer d'autres établissements.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section contact-cta">
        <div className="container">
          <div className="cta-box">
            <h2>Prêt à rejoindre la résistance ?</h2>
            <p>
              Contactez-nous pour en savoir plus sur la démarche NIRD 
              et comment engager votre établissement.
            </p>
            <Link to="/contact" className="btn btn-primary">
              ✉️ Nous contacter
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Community

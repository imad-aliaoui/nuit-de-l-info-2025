import { useState, useEffect } from 'react'
import { useEasterEggs } from '../hooks/useEasterEggs'
import './Pillars.css'

function Pillars() {
  const [pillars, setPillars] = useState([])
  const [activePillar, setActivePillar] = useState(null)
  const { triggerMascot } = useEasterEggs()

  useEffect(() => {
    fetch('/api/pillars')
      .then(res => res.json())
      .then(data => {
        setPillars(data)
        if (data.length > 0) setActivePillar(data[0])
      })
      .catch(() => {
        const defaultPillars = [
          {
            id: 1,
            name: 'Inclusion',
            slug: 'inclusion',
            description: 'Accès équitable au numérique pour tous. Réduire la fracture numérique et permettre à chaque élève, enseignant et famille de bénéficier des outils numériques, quel que soit son niveau de compétence ou ses moyens.',
            icon: 'users',
            color: '#4CAF50',
            activities: ['Formation des équipes éducatives', 'Accompagnement des familles', 'Accessibilité des outils', 'Réduction de la fracture numérique']
          },
          {
            id: 2,
            name: 'Responsabilité',
            slug: 'responsabilite',
            description: 'Usage raisonné et réflexif des technologies. Choisir des solutions souveraines et respectueuses des données personnelles, sensibiliser à la sobriété numérique.',
            icon: 'shield',
            color: '#2196F3',
            activities: ['Protection des données personnelles', 'Souveraineté numérique', 'Sensibilisation à la sobriété', 'Choix de logiciels libres']
          },
          {
            id: 3,
            name: 'Durabilité',
            slug: 'durabilite',
            description: 'Lutte contre l\'obsolescence programmée. Prolonger la vie du matériel informatique grâce à Linux, favoriser le réemploi et le reconditionnement, maîtriser les coûts.',
            icon: 'recycle',
            color: '#FF9800',
            activities: ['Adoption de Linux', 'Reconditionnement du matériel', 'Réemploi des équipements', 'Mutualisation des ressources']
          }
        ]
        setPillars(defaultPillars)
        setActivePillar(defaultPillars[0])
      })
  }, [])

  const getEmoji = (icon) => {
    const emojiMap = {
      'users': '👥',
      'shield': '🛡️',
      'recycle': '♻️'
    }
    return emojiMap[icon] || '📌'
  }

  const handlePillarClick = (pillar) => {
    setActivePillar(pillar)
    if (pillar.slug === 'durabilite') {
      triggerMascot("🐧 Saviez-vous qu'un PC sous Linux peut durer 10 à 15 ans ?")
    }
  }

  return (
    <div className="pillars-page">
      <section className="pillars-hero">
        <div className="container">
          <h1>Les 3 Piliers de la Démarche NIRD</h1>
          <p>
            La démarche NIRD repose sur trois principes fondamentaux qui guident 
            l'ensemble des actions menées pour un numérique éducatif plus autonome, 
            plus durable et plus éthique.
          </p>
        </div>
      </section>

      <section className="section pillars-content">
        <div className="container">
          <div className="pillars-tabs">
            {pillars.map(pillar => (
              <button
                key={pillar.id}
                className={`pillar-tab ${activePillar?.id === pillar.id ? 'active' : ''}`}
                onClick={() => handlePillarClick(pillar)}
                style={{ '--pillar-color': pillar.color }}
              >
                <span className="tab-emoji">{getEmoji(pillar.icon)}</span>
                <span className="tab-name">{pillar.name}</span>
              </button>
            ))}
          </div>

          {activePillar && (
            <div className="pillar-detail fade-in" key={activePillar.id}>
              <div className="detail-header" style={{ '--pillar-color': activePillar.color }}>
                <span className="detail-emoji">{getEmoji(activePillar.icon)}</span>
                <h2>{activePillar.name}</h2>
              </div>
              
              <div className="detail-content">
                <p className="detail-description">{activePillar.description}</p>
                
                <div className="activities-section">
                  <h3>Actions concrètes</h3>
                  <div className="activities-grid">
                    {activePillar.activities?.map((activity, index) => (
                      <div className="activity-card" key={index} style={{ '--delay': `${index * 0.1}s` }}>
                        <span className="activity-number">{index + 1}</span>
                        <span className="activity-text">{activity}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="section nird-origin">
        <div className="container">
          <h2 className="section-title">D'où vient la démarche NIRD ?</h2>
          <div className="origin-content">
            <div className="origin-text">
              <p>
                La démarche NIRD est portée par un <strong>collectif enseignant</strong> de la 
                Forge des communs numériques éducatifs, projet soutenu par la Direction 
                du numérique pour l'éducation.
              </p>
              <p>
                C'est une <strong>initiative du terrain</strong> qui cherche à montrer qu'il y a 
                urgence à agir pour changer la situation de dépendance aux Big Tech.
              </p>
              <p>
                Le projet NIRD est né au <strong>lycée Carnot de Bruay-la-Buissière</strong> 
                (Hauts-de-France). Les élèves y reconditionnent des ordinateurs destinés 
                à la déchetterie pour les redistribuer aux familles et écoles du territoire.
              </p>
            </div>
            <div className="origin-quote">
              <blockquote>
                "Ensemble, ces acteurs expérimentent, partagent et transforment les pratiques 
                pour construire un numérique éducatif plus autonome, plus durable, plus éthique."
              </blockquote>
              <cite>— Collectif NIRD</cite>
            </div>
          </div>
        </div>
      </section>

      <section className="section resources-section">
        <div className="container">
          <h2 className="section-title">Ressources & Médias</h2>
          <div className="resources-grid">
            <a href="https://video.echirolles.fr/w/hVykGUtRZqRen6eiutqRvQ" target="_blank" rel="noopener" className="resource-card">
              <span className="resource-icon">📺</span>
              <h4>Windows 11 : l'alternative des logiciels libres</h4>
              <p>Reportage France 3 Alpes (2 min)</p>
            </a>
            <a href="https://www.youtube.com/watch?v=76T8oubek-c" target="_blank" rel="noopener" className="resource-card">
              <span className="resource-icon">📰</span>
              <h4>L'État obligé de jeter des milliers d'ordinateurs ?</h4>
              <p>Reportage France Info (3 min)</p>
            </a>
            <a href="https://www.cafepedagogique.net/2025/04/27/bruay-labuissiere-voyage-au-centre-du-libre-educatif/" target="_blank" rel="noopener" className="resource-card">
              <span className="resource-icon">📝</span>
              <h4>Voyage au centre du libre éducatif</h4>
              <p>Article du Café Pédagogique</p>
            </a>
            <a href="https://tube-numerique-educatif.apps.education.fr/w/pZCnzPKTYX2iF38Qh4ZGmq" target="_blank" rel="noopener" className="resource-card">
              <span className="resource-icon">🎬</span>
              <h4>Le projet NIRD présenté par les élèves</h4>
              <p>Vidéo du lycée Carnot (4 min)</p>
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Pillars

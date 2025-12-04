import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useEasterEggs } from '../hooks/useEasterEggs'
import './Journey.css'

function Journey() {
  const [steps, setSteps] = useState([])
  const [currentStep, setCurrentStep] = useState(0)
  const [completedSteps, setCompletedSteps] = useState([])
  const { triggerMascot } = useEasterEggs()

  useEffect(() => {
    fetch('/api/journey')
      .then(res => res.json())
      .then(data => setSteps(data))
      .catch(() => {
        setSteps([
          { id: 1, step_number: 1, title: 'Mobilisation', description: 'Sensibiliser l\'équipe éducative et identifier les volontaires pour porter la démarche.', action_text: 'Former un groupe pilote', icon: 'flag', difficulty: 'facile' },
          { id: 2, step_number: 2, title: 'Diagnostic', description: 'Évaluer le parc informatique existant et identifier les machines candidates à Linux.', action_text: 'Auditer le parc', icon: 'search', difficulty: 'facile' },
          { id: 3, step_number: 3, title: 'Expérimentation', description: 'Installer Linux sur quelques postes pilotes et former les premiers utilisateurs.', action_text: 'Lancer un pilote', icon: 'flask', difficulty: 'moyen' },
          { id: 4, step_number: 4, title: 'Formation', description: 'Organiser des sessions de formation pour les enseignants et le personnel.', action_text: 'Former les équipes', icon: 'graduation-cap', difficulty: 'moyen' },
          { id: 5, step_number: 5, title: 'Déploiement', description: 'Étendre Linux à l\'ensemble du parc et mettre en place les outils libres.', action_text: 'Déployer', icon: 'rocket', difficulty: 'avancé' },
          { id: 6, step_number: 6, title: 'Reconditionnement', description: 'Organiser des ateliers de reconditionnement avec les élèves.', action_text: 'Créer un atelier', icon: 'recycle', difficulty: 'moyen' },
          { id: 7, step_number: 7, title: 'Intégration', description: 'Ancrer la démarche NIRD dans le projet d\'établissement.', action_text: 'Pérenniser', icon: 'check-circle', difficulty: 'avancé' }
        ])
      })
  }, [])

  const getEmoji = (icon) => {
    const emojiMap = {
      'flag': '🚩',
      'search': '🔍',
      'flask': '🧪',
      'graduation-cap': '🎓',
      'rocket': '🚀',
      'recycle': '♻️',
      'check-circle': '✅'
    }
    return emojiMap[icon] || '📌'
  }

  const getDifficultyClass = (difficulty) => {
    return `difficulty-${difficulty}`
  }

  const completeStep = (stepIndex) => {
    if (!completedSteps.includes(stepIndex)) {
      setCompletedSteps([...completedSteps, stepIndex])
      
      if (completedSteps.length + 1 === steps.length) {
        triggerMascot("🎉 Félicitations ! Votre établissement est maintenant un Village Numérique Résistant !")
      } else {
        const messages = [
          "Bravo ! Un pas de plus vers l'autonomie numérique !",
          "Excellent ! La résistance s'organise !",
          "Super ! Le village grandit !",
          "Parfait ! Les Big Tech tremblent !"
        ]
        triggerMascot(messages[Math.floor(Math.random() * messages.length)])
      }
    }
    
    if (stepIndex < steps.length - 1) {
      setCurrentStep(stepIndex + 1)
    }
  }

  const progressPercent = steps.length > 0 ? (completedSteps.length / steps.length) * 100 : 0

  return (
    <div className="journey-page">
      <section className="journey-hero">
        <div className="container">
          <h1>🗺️ Le Parcours du Village Résistant</h1>
          <p>
            Suivez les étapes pour transformer votre établissement en village numérique 
            autonome. Chaque étape vous rapproche de la liberté numérique !
          </p>
        </div>
      </section>

      <section className="section journey-content">
        <div className="container">
          <div className="progress-section">
            <div className="progress-header">
              <h3>Progression de votre village</h3>
              <span className="progress-text">{completedSteps.length} / {steps.length} étapes complétées</span>
            </div>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${progressPercent}%` }}></div>
            </div>
            {progressPercent === 100 && (
              <div className="victory-badge">
                🏆 Village Numérique Résistant Certifié !
              </div>
            )}
          </div>

          <div className="journey-timeline">
            {steps.map((step, index) => (
              <div 
                key={step.id}
                className={`timeline-step ${currentStep === index ? 'active' : ''} ${completedSteps.includes(index) ? 'completed' : ''}`}
                onClick={() => setCurrentStep(index)}
              >
                <div className="step-connector">
                  <div className="connector-line"></div>
                  <div className="step-dot">
                    {completedSteps.includes(index) ? '✓' : step.step_number}
                  </div>
                </div>
                
                <div className="step-card">
                  <div className="step-header">
                    <span className="step-emoji">{getEmoji(step.icon)}</span>
                    <div className="step-info">
                      <h3>{step.title}</h3>
                      <span className={`step-difficulty ${getDifficultyClass(step.difficulty)}`}>
                        {step.difficulty}
                      </span>
                    </div>
                  </div>
                  
                  <p className="step-description">{step.description}</p>
                  
                  <div className="step-actions">
                    <button 
                      className={`btn ${completedSteps.includes(index) ? 'btn-completed' : 'btn-primary'}`}
                      onClick={(e) => {
                        e.stopPropagation()
                        completeStep(index)
                      }}
                      disabled={completedSteps.includes(index)}
                    >
                      {completedSteps.includes(index) ? '✓ Terminé' : step.action_text}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="journey-cta">
            <h3>Prêt à passer à l'action ?</h3>
            <p>Testez vos connaissances avec nos scénarios interactifs !</p>
            <Link to="/scenarios" className="btn btn-accent">
              🎮 Découvrir les scénarios
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Journey

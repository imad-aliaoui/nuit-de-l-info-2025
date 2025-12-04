import { useState, useEffect } from 'react'
import { useEasterEggs } from '../hooks/useEasterEggs'
import './Scenarios.css'

function Scenarios() {
  const [scenarios, setScenarios] = useState([])
  const [currentScenario, setCurrentScenario] = useState(0)
  const [selectedChoice, setSelectedChoice] = useState(null)
  const [showResult, setShowResult] = useState(false)
  const [totalScore, setTotalScore] = useState(0)
  const [completedScenarios, setCompletedScenarios] = useState([])
  const { triggerMascot } = useEasterEggs()

  useEffect(() => {
    fetch('/api/scenarios')
      .then(res => res.json())
      .then(data => setScenarios(data))
      .catch(() => {
        setScenarios([
          {
            id: 1,
            title: 'Mon parc est bloqué en Windows 10',
            description: 'La fin du support de Windows 10 approche et votre parc de 50 PC risque l\'obsolescence. Que faites-vous ?',
            choices: [
              { id: 'a', text: 'Acheter 50 nouveaux PC compatibles Windows 11', result: 'Coût estimé : 50 000€. Empreinte carbone élevée. Dépendance maintenue.', score: 0, isNird: false },
              { id: 'b', text: 'Installer Linux sur le parc existant', result: 'Coût quasi nul ! Les PC retrouvent une seconde vie. Économie de 50 000€ !', score: 100, isNird: true },
              { id: 'c', text: 'Attendre et voir ce qui se passe', result: 'Risque de failles de sécurité. Pas de solution durable.', score: 10, isNird: false }
            ]
          },
          {
            id: 2,
            title: 'Des PC destinés à la déchetterie',
            description: 'La collectivité vous propose 20 ordinateurs "obsolètes" de 5 ans. Ils fonctionnent encore mais sont trop lents sous Windows.',
            choices: [
              { id: 'a', text: 'Refuser, ils sont trop vieux', result: 'Opportunité manquée. Ces PC partent en déchetterie.', score: 0, isNird: false },
              { id: 'b', text: 'Récupérer et reconditionner avec les élèves', result: 'Excellent choix NIRD ! Les élèves apprennent et le matériel est sauvé.', score: 100, isNird: true },
              { id: 'c', text: 'Les récupérer pour pièces détachées', result: 'Bonne idée mais le potentiel n\'est pas exploité au maximum.', score: 40, isNird: false }
            ]
          },
          {
            id: 3,
            title: 'Suite bureautique payante ou libre ?',
            description: 'Le renouvellement des licences Microsoft Office coûte 3000€/an. Une alternative existe : LibreOffice.',
            choices: [
              { id: 'a', text: 'Renouveler les licences Office', result: 'Coût annuel maintenu. Dépendance aux formats propriétaires.', score: 10, isNird: false },
              { id: 'b', text: 'Migrer vers LibreOffice', result: 'Économie de 3000€/an ! Logiciel libre et formats ouverts.', score: 100, isNird: true },
              { id: 'c', text: 'Utiliser uniquement Google Docs', result: 'Gratuit mais données stockées hors UE. Dépendance maintenue.', score: 30, isNird: false }
            ]
          }
        ])
      })
  }, [])

  const handleChoice = (choice) => {
    setSelectedChoice(choice)
    setShowResult(true)
    setTotalScore(prev => prev + choice.score)
    
    if (!completedScenarios.includes(currentScenario)) {
      setCompletedScenarios([...completedScenarios, currentScenario])
    }

    if (choice.isNird) {
      triggerMascot("🎉 Excellent choix ! Vous pensez comme un vrai résistant numérique !")
    } else if (choice.score > 0) {
      triggerMascot("🤔 Pas mal, mais il existe une meilleure solution NIRD...")
    }
  }

  const nextScenario = () => {
    if (currentScenario < scenarios.length - 1) {
      setCurrentScenario(prev => prev + 1)
      setSelectedChoice(null)
      setShowResult(false)
    }
  }

  const resetScenarios = () => {
    setCurrentScenario(0)
    setSelectedChoice(null)
    setShowResult(false)
    setTotalScore(0)
    setCompletedScenarios([])
  }

  const currentScenarioData = scenarios[currentScenario]
  const isComplete = completedScenarios.length === scenarios.length

  return (
    <div className="scenarios-page">
      <section className="scenarios-hero">
        <div className="container">
          <h1>🎮 Scénarios de Résistance</h1>
          <p>
            Testez vos réflexes de résistant numérique ! Faites les bons choix 
            pour votre établissement face aux dilemmes du numérique.
          </p>
        </div>
      </section>

      <section className="section scenarios-content">
        <div className="container">
          <div className="scenario-progress">
            <div className="progress-dots">
              {scenarios.map((_, index) => (
                <div 
                  key={index}
                  className={`progress-dot ${index === currentScenario ? 'active' : ''} ${completedScenarios.includes(index) ? 'completed' : ''}`}
                />
              ))}
            </div>
            <div className="score-display">
              Score : <span className="score-value">{totalScore}</span> points
            </div>
          </div>

          {currentScenarioData && !isComplete && (
            <div className="scenario-card fade-in" key={currentScenarioData.id}>
              <div className="scenario-header">
                <span className="scenario-number">Scénario {currentScenario + 1}/{scenarios.length}</span>
                <h2>{currentScenarioData.title}</h2>
              </div>

              <p className="scenario-description">{currentScenarioData.description}</p>

              <div className="choices-grid">
                {currentScenarioData.choices.map((choice) => (
                  <button
                    key={choice.id}
                    className={`choice-btn ${selectedChoice?.id === choice.id ? 'selected' : ''} ${showResult ? (choice.isNird ? 'correct' : 'incorrect') : ''}`}
                    onClick={() => !showResult && handleChoice(choice)}
                    disabled={showResult}
                  >
                    <span className="choice-letter">{choice.id.toUpperCase()}</span>
                    <span className="choice-text">{choice.text}</span>
                    {showResult && choice.isNird && <span className="nird-badge">NIRD ✓</span>}
                  </button>
                ))}
              </div>

              {showResult && (
                <div className={`result-box fade-in ${selectedChoice?.isNird ? 'success' : 'warning'}`}>
                  <div className="result-header">
                    {selectedChoice?.isNird ? '🎉 Choix NIRD !' : '💡 À retenir'}
                  </div>
                  <p>{selectedChoice?.result}</p>
                  <div className="result-score">
                    +{selectedChoice?.score} points
                  </div>
                </div>
              )}

              {showResult && (
                <div className="scenario-actions">
                  {currentScenario < scenarios.length - 1 ? (
                    <button className="btn btn-primary" onClick={nextScenario}>
                      Scénario suivant →
                    </button>
                  ) : (
                    <button className="btn btn-accent" onClick={() => {}}>
                      Voir le résultat final
                    </button>
                  )}
                </div>
              )}
            </div>
          )}

          {isComplete && (
            <div className="final-result fade-in">
              <div className="result-trophy">🏆</div>
              <h2>Résultats de votre résistance !</h2>
              <div className="final-score">
                <span className="score-label">Score total</span>
                <span className="score-number">{totalScore}</span>
                <span className="score-max">/ {scenarios.length * 100} points</span>
              </div>
              
              <div className="result-message">
                {totalScore >= scenarios.length * 80 ? (
                  <p>🌟 <strong>Félicitations !</strong> Vous êtes un véritable résistant numérique ! Prêt à mener votre établissement vers l'autonomie.</p>
                ) : totalScore >= scenarios.length * 50 ? (
                  <p>👍 <strong>Bien joué !</strong> Vous comprenez les enjeux mais il reste quelques réflexes Big Tech à perdre.</p>
                ) : (
                  <p>🎯 <strong>En progression !</strong> Explorez la démarche NIRD pour devenir un vrai résistant numérique.</p>
                )}
              </div>

              <button className="btn btn-primary" onClick={resetScenarios}>
                🔄 Recommencer
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

export default Scenarios

import { useState, useEffect, useCallback } from 'react'
import { useEasterEggs } from '../hooks/useEasterEggs'
import './RecycleGame.css'

const GAME_ITEMS = [
  { id: 1, name: 'PC Windows 10', emoji: '💻', canRecycle: true, points: 100 },
  { id: 2, name: 'Écran cassé', emoji: '🖥️', canRecycle: false, points: -50 },
  { id: 3, name: 'Laptop ancien', emoji: '💻', canRecycle: true, points: 100 },
  { id: 4, name: 'Clavier USB', emoji: '⌨️', canRecycle: true, points: 50 },
  { id: 5, name: 'Souris', emoji: '🖱️', canRecycle: true, points: 50 },
  { id: 6, name: 'Câble HDMI', emoji: '🔌', canRecycle: true, points: 30 },
  { id: 7, name: 'Batterie morte', emoji: '🔋', canRecycle: false, points: -50 },
  { id: 8, name: 'RAM 4GB', emoji: '📟', canRecycle: true, points: 75 },
]

function RecycleGame() {
  const { showRecycleGame, closeRecycleGame, triggerMascot } = useEasterEggs()
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(30)
  const [currentItem, setCurrentItem] = useState(null)
  const [gameOver, setGameOver] = useState(false)
  const [savedPCs, setSavedPCs] = useState(0)

  const getRandomItem = useCallback(() => {
    const randomIndex = Math.floor(Math.random() * GAME_ITEMS.length)
    return GAME_ITEMS[randomIndex]
  }, [])

  const startGame = useCallback(() => {
    setScore(0)
    setTimeLeft(30)
    setGameOver(false)
    setSavedPCs(0)
    setCurrentItem(getRandomItem())
  }, [getRandomItem])

  useEffect(() => {
    if (showRecycleGame && !gameOver && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            setGameOver(true)
            return 0
          }
          return prev - 1
        })
      }, 1000)
      return () => clearInterval(timer)
    }
  }, [showRecycleGame, gameOver, timeLeft])

  useEffect(() => {
    if (showRecycleGame && !currentItem) {
      startGame()
    }
  }, [showRecycleGame, currentItem, startGame])

  const handleChoice = (choice) => {
    if (gameOver || !currentItem) return

    const isCorrect = (choice === 'recycle' && currentItem.canRecycle) ||
                      (choice === 'trash' && !currentItem.canRecycle)

    if (isCorrect) {
      setScore(prev => prev + Math.abs(currentItem.points))
      if (currentItem.canRecycle && currentItem.emoji === '💻') {
        setSavedPCs(prev => prev + 1)
      }
    } else {
      setScore(prev => Math.max(0, prev - 25))
    }

    setCurrentItem(getRandomItem())
  }

  const handleClose = () => {
    if (gameOver && savedPCs > 0) {
      triggerMascot(`🎉 Bravo ! Vous avez sauvé ${savedPCs} PC de l'obsolescence !`)
    }
    setCurrentItem(null)
    closeRecycleGame()
  }

  if (!showRecycleGame) return null

  return (
    <div className="game-overlay">
      <div className="game-modal">
        <button className="game-close" onClick={handleClose}>×</button>
        
        <h2 className="game-title">♻️ Sauvez les PC !</h2>
        <p className="game-subtitle">
          Triez le matériel : recyclez ce qui peut être sauvé avec Linux !
        </p>

        <div className="game-stats">
          <div className="stat">
            <span className="stat-label">Score</span>
            <span className="stat-value">{score}</span>
          </div>
          <div className="stat">
            <span className="stat-label">Temps</span>
            <span className={`stat-value ${timeLeft <= 10 ? 'warning' : ''}`}>{timeLeft}s</span>
          </div>
          <div className="stat">
            <span className="stat-label">PC sauvés</span>
            <span className="stat-value">{savedPCs}</span>
          </div>
        </div>

        {!gameOver ? (
          <>
            <div className="game-item">
              <span className="item-emoji">{currentItem?.emoji}</span>
              <span className="item-name">{currentItem?.name}</span>
            </div>

            <div className="game-buttons">
              <button 
                className="game-btn recycle"
                onClick={() => handleChoice('recycle')}
              >
                🐧 Reconditionner avec Linux
              </button>
              <button 
                className="game-btn trash"
                onClick={() => handleChoice('trash')}
              >
                🗑️ Irréparable
              </button>
            </div>
          </>
        ) : (
          <div className="game-over">
            <h3>Partie terminée !</h3>
            <p className="final-score">Score final : {score} points</p>
            <p className="saved-count">
              {savedPCs > 0 
                ? `🎉 Vous avez sauvé ${savedPCs} PC de la déchetterie !`
                : 'Aucun PC sauvé cette fois...'}
            </p>
            <button className="btn btn-primary" onClick={startGame}>
              Rejouer
            </button>
          </div>
        )}

        <p className="game-hint">
          💡 Astuce : Un PC lent sous Windows peut revivre avec Linux !
        </p>
      </div>
    </div>
  )
}

export default RecycleGame

import { createContext, useContext, useState, useEffect, useCallback } from 'react'

const EasterEggContext = createContext()

export function EasterEggProvider({ children }) {
  const [isGauloisMode, setIsGauloisMode] = useState(false)
  const [isUltraResistant, setIsUltraResistant] = useState(false)
  const [showMascot, setShowMascot] = useState(false)
  const [mascotMessage, setMascotMessage] = useState('')
  const [showRecycleGame, setShowRecycleGame] = useState(false)
  const [clickCount, setClickCount] = useState(0)
  const [konamiProgress, setKonamiProgress] = useState(0)
  const [nirdProgress, setNirdProgress] = useState(0)

  const konamiCode = [
    'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
    'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
    'KeyB', 'KeyA'
  ]

  const nirdCode = ['KeyN', 'KeyI', 'KeyR', 'KeyD']

  const toggleGauloisMode = useCallback(() => {
    setIsGauloisMode(prev => !prev)
    if (!isGauloisMode) {
      triggerMascot("Par Toutatis ! Le mode Village Gaulois est activé ! 🏰⚔️")
    }
  }, [isGauloisMode])

  const triggerMascot = useCallback((message) => {
    setMascotMessage(message)
    setShowMascot(true)
    setTimeout(() => setShowMascot(false), 5000)
  }, [])

  const openRecycleGame = useCallback(() => {
    setShowRecycleGame(true)
  }, [])

  const closeRecycleGame = useCallback(() => {
    setShowRecycleGame(false)
  }, [])

  const incrementClick = useCallback(() => {
    setClickCount(prev => {
      const newCount = prev + 1
      if (newCount === 7) {
        triggerMascot("🐧 Vous avez découvert le secret du Pingouin Libre !")
        return 0
      }
      return newCount
    })
  }, [triggerMascot])

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === konamiCode[konamiProgress]) {
        const newProgress = konamiProgress + 1
        setKonamiProgress(newProgress)
        
        if (newProgress === konamiCode.length) {
          setKonamiProgress(0)
          openRecycleGame()
          triggerMascot("🎮 Mini-jeu Recyclage débloqué ! Sauvez les PC de l'obsolescence !")
        }
      } else {
        setKonamiProgress(0)
      }

      if (e.code === nirdCode[nirdProgress]) {
        const newProgress = nirdProgress + 1
        setNirdProgress(newProgress)
        
        if (newProgress === nirdCode.length) {
          setNirdProgress(0)
          setIsUltraResistant(prev => !prev)
          triggerMascot("💚 MODE ULTRA RÉSISTANT ACTIVÉ ! Vous êtes un vrai guerrier du libre !")
        }
      } else if (!konamiCode.includes(e.code)) {
        setNirdProgress(0)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [konamiProgress, nirdProgress, openRecycleGame, triggerMascot])

  useEffect(() => {
    if (isGauloisMode) {
      document.body.classList.add('gaulois-mode')
    } else {
      document.body.classList.remove('gaulois-mode')
    }
  }, [isGauloisMode])

  useEffect(() => {
    if (isUltraResistant) {
      document.body.classList.add('ultra-resistant-mode')
    } else {
      document.body.classList.remove('ultra-resistant-mode')
    }
  }, [isUltraResistant])

  const value = {
    isGauloisMode,
    isUltraResistant,
    showMascot,
    mascotMessage,
    showRecycleGame,
    clickCount,
    toggleGauloisMode,
    triggerMascot,
    openRecycleGame,
    closeRecycleGame,
    incrementClick
  }

  return (
    <EasterEggContext.Provider value={value}>
      {children}
    </EasterEggContext.Provider>
  )
}

export function useEasterEggs() {
  const context = useContext(EasterEggContext)
  if (!context) {
    throw new Error('useEasterEggs must be used within EasterEggProvider')
  }
  return context
}

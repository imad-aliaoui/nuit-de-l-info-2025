import { useEasterEggs } from '../hooks/useEasterEggs'
import './Mascot.css'

function Mascot() {
  const { showMascot, mascotMessage, isGauloisMode } = useEasterEggs()

  if (!showMascot) return null

  return (
    <div className={`mascot-container ${showMascot ? 'visible' : ''}`}>
      <div className="mascot">
        <div className="mascot-character">
          {isGauloisMode ? '🧙‍♂️' : '🐧'}
        </div>
        <div className="mascot-bubble">
          <p>{mascotMessage}</p>
          <div className="bubble-tail"></div>
        </div>
      </div>
    </div>
  )
}

export default Mascot

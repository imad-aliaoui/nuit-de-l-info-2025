import { useState } from 'react'
import { useEasterEggs } from '../hooks/useEasterEggs'
import './Contact.css'

function Contact() {
  const [formData, setFormData] = useState({
    nom: '',
    email: '',
    sujet: '',
    message: '',
    website: ''
  })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showPopup, setShowPopup] = useState(false)
  const [popupMessage, setPopupMessage] = useState('')
  const { triggerMascot, isGauloisMode } = useEasterEggs()

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.nom.trim() || formData.nom.trim().length < 2) {
      newErrors.nom = 'Le nom est requis (minimum 2 caractères)'
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!formData.email.trim() || !emailRegex.test(formData.email)) {
      newErrors.email = 'Email invalide'
    }
    
    if (!formData.sujet.trim() || formData.sujet.trim().length < 3) {
      newErrors.sujet = 'Le sujet est requis (minimum 3 caractères)'
    }
    
    if (!formData.message.trim() || formData.message.trim().length < 10) {
      newErrors.message = 'Le message est requis (minimum 10 caractères)'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) return
    
    setIsSubmitting(true)
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })
      
      const data = await response.json()
      
      if (data.success) {
        setPopupMessage(data.message)
        setShowPopup(true)
        setFormData({ nom: '', email: '', sujet: '', message: '', website: '' })
        triggerMascot("📬 Message envoyé ! Les druides du libre vous répondront bientôt !")
      } else {
        setErrors(data.errors || { general: 'Une erreur est survenue' })
      }
    } catch (error) {
      setPopupMessage("Par Toutatis ! Votre message a été transmis aux druides du village NIRD !")
      setShowPopup(true)
      setFormData({ nom: '', email: '', sujet: '', message: '', website: '' })
    } finally {
      setIsSubmitting(false)
    }
  }

  const closePopup = () => {
    setShowPopup(false)
  }

  return (
    <div className="contact-page">
      <section className="contact-hero">
        <div className="container">
          <h1>✉️ Contactez le Village</h1>
          <p>
            Une question sur la démarche NIRD ? Envie de rejoindre la résistance ?
            Envoyez-nous un message, nos druides du libre vous répondront !
          </p>
        </div>
      </section>

      <section className="section contact-content">
        <div className="container">
          <div className="contact-grid">
            <div className="contact-form-wrapper">
              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-group">
                  <label htmlFor="nom">Nom *</label>
                  <input
                    type="text"
                    id="nom"
                    name="nom"
                    value={formData.nom}
                    onChange={handleChange}
                    className={errors.nom ? 'error' : ''}
                    placeholder="Votre nom de résistant"
                  />
                  {errors.nom && <span className="error-message">{errors.nom}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={errors.email ? 'error' : ''}
                    placeholder="votre@email.fr"
                  />
                  {errors.email && <span className="error-message">{errors.email}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="sujet">Sujet *</label>
                  <select
                    id="sujet"
                    name="sujet"
                    value={formData.sujet}
                    onChange={handleChange}
                    className={errors.sujet ? 'error' : ''}
                  >
                    <option value="">Choisir un sujet...</option>
                    <option value="Rejoindre NIRD">🏛️ Rejoindre la démarche NIRD</option>
                    <option value="Question Linux">🐧 Question sur Linux</option>
                    <option value="Reconditionnement">♻️ Reconditionnement de matériel</option>
                    <option value="Partenariat">🤝 Proposition de partenariat</option>
                    <option value="Témoignage">📣 Partager un témoignage</option>
                    <option value="Autre">💬 Autre sujet</option>
                  </select>
                  {errors.sujet && <span className="error-message">{errors.sujet}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="message">Message *</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className={errors.message ? 'error' : ''}
                    placeholder="Votre message pour le village..."
                    rows="6"
                  ></textarea>
                  {errors.message && <span className="error-message">{errors.message}</span>}
                </div>

                <div className="honeypot">
                  <input
                    type="text"
                    name="website"
                    value={formData.website}
                    onChange={handleChange}
                    tabIndex="-1"
                    autoComplete="off"
                  />
                </div>

                {errors.general && (
                  <div className="general-error">{errors.general}</div>
                )}

                <button 
                  type="submit" 
                  className="btn btn-primary submit-btn"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <span className="spinner"></span>
                      Envoi en cours...
                    </>
                  ) : (
                    <>
                      🚀 Envoyer le message
                    </>
                  )}
                </button>
              </form>
            </div>

            <div className="contact-info">
              <div className="info-card">
                <h3>🏛️ Village Numérique Résistant</h3>
                <p>
                  Nous sommes un collectif d'enseignants, techniciens et passionnés 
                  du libre qui œuvrent pour un numérique éducatif plus autonome.
                </p>
              </div>

              <div className="info-card">
                <h3>💬 Forum Tchap</h3>
                <p>
                  Rejoignez notre forum pour échanger avec la communauté NIRD 
                  et poser vos questions en direct.
                </p>
                <a 
                  href="https://edurl.fr/tchap-laforgeedu-nird" 
                  target="_blank" 
                  rel="noopener"
                  className="info-link"
                >
                  Rejoindre le forum →
                </a>
              </div>

              <div className="info-card">
                <h3>🌐 Site officiel NIRD</h3>
                <p>
                  Retrouvez toutes les informations sur la démarche, 
                  les ressources et les établissements pilotes.
                </p>
                <a 
                  href="https://nird.forge.apps.education.fr/" 
                  target="_blank" 
                  rel="noopener"
                  className="info-link"
                >
                  Visiter le site →
                </a>
              </div>

              <div className="fun-fact">
                <span className="fun-icon">{isGauloisMode ? '⚔️' : '🐧'}</span>
                <p>
                  <strong>Le saviez-vous ?</strong><br/>
                  Un PC sous Linux peut fonctionner 10 à 15 ans, 
                  contre 5 ans sous Windows !
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {showPopup && (
        <div className="popup-overlay" onClick={closePopup}>
          <div className={`popup-modal ${isGauloisMode ? 'gaulois' : ''}`} onClick={e => e.stopPropagation()}>
            <button className="popup-close" onClick={closePopup}>×</button>
            <div className="popup-content">
              <div className="popup-icon">
                {isGauloisMode ? '⚔️' : '📬'}
              </div>
              <h2>Message envoyé !</h2>
              <p className="popup-message">{popupMessage}</p>
              <div className="popup-decoration">
                <span>🏛️</span>
                <span>🐧</span>
                <span>♻️</span>
              </div>
              <button className="btn btn-primary" onClick={closePopup}>
                Continuer la résistance !
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Contact

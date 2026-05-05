import { useState } from 'react'
import './index.css'

// 👇 Replace with your Web3Forms access key (get it free at https://web3forms.com)
const WEB3FORMS_KEY = 'bd37157e-8a07-49fd-b552-92f36f60f397'

function App() {
  const [showModal, setShowModal] = useState(false)
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleNotify = () => {
    setShowModal(true)
    setSubmitted(false)
    setError('')
    setEmail('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!email.trim() || loading) return

    setLoading(true)
    setError('')

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: '🔔 New TableTop Subscriber!',
          from_name: 'TableTop Coming Soon',
          email: email.trim(),
          message: `New subscriber wants to be notified: ${email.trim()}`,
        }),
      })

      const data = await res.json()

      if (data.success) {
        setSubmitted(true)
        setTimeout(() => {
          setShowModal(false)
        }, 2500)
      } else {
        setError('Something went wrong. Please try again.')
      }
    } catch {
      setError('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="coming-soon-wrapper">
      {/* Ambient glow blobs */}
      <div className="glow-blob glow-1" />
      <div className="glow-blob glow-2" />
      <div className="glow-blob glow-3" />

      {/* 3D Decorations */}
      <div className="deco deco-fortune-top">
        <img src="/fortune-cookie.png" alt="" aria-hidden="true" />
      </div>
      <div className="deco deco-green-ring">
        <img src="/green-ring.png" alt="" aria-hidden="true" />
      </div>
      <div className="deco deco-confetti">
        <img src="/confetti.png" alt="" aria-hidden="true" />
      </div>
      <div className="deco deco-fortune-bottom">
        <img src="/fortune-cookie.png" alt="" aria-hidden="true" />
      </div>

      {/* Main Card */}
      <div className="card">
        {/* Logo Badge */}
        <div className="logo-badge" id="logo-badge">
          <div className="logo-icon">
            <img src="/logo.png" alt="TableTop logo" />
          </div>
          <span className="logo-text">TableTop</span>
        </div>

        {/* Hand Wave */}
        <div className="hand-emoji">
          <img src="/hand.png" alt="Waving hand" />
        </div>

        {/* Content */}
        <p className="subtitle">WE'RE STILL</p>
        <h1 className="heading">Cooking Our Website.</h1>
        <p className="description">
          We are going to launch our product very soon.<br />
          Stay Tuned!
        </p>

        {/* CTA Button */}
        <button className="notify-btn" id="notify-btn" type="button" onClick={handleNotify}>
          <span className="icon-circle">
            <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="4" width="20" height="16" rx="2" />
              <path d="M22 4L12 13L2 4" />
            </svg>
          </span>
          <span className="btn-label">
            Notify Me
            <span className="arrow">&gt;</span>
          </span>
        </button>

        {/* Social Links */}
        <div className="social-links">
          <a href="https://www.instagram.com/tabletop.food/" target="_blank" rel="noopener noreferrer" className="social-link" id="social-instagram" aria-label="Instagram">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" />
              <circle cx="12" cy="12" r="5" />
              <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
            </svg>
          </a>
          <a href="https://linkedin.com/company/tabletop-food/" target="_blank" rel="noopener noreferrer" className="social-link" id="social-linkedin" aria-label="LinkedIn">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" />
              <rect x="2" y="9" width="4" height="12" />
              <circle cx="4" cy="4" r="2" />
            </svg>
          </a>
        </div>
      </div>

      {/* Notify Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowModal(false)} aria-label="Close">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M18 6L6 18" />
                <path d="M6 6l12 12" />
              </svg>
            </button>

            {!submitted ? (
              <>
                <div className="modal-icon">
                  <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <path d="M22 4L12 13L2 4" />
                  </svg>
                </div>
                <h2 className="modal-title">Get Notified</h2>
                <p className="modal-desc">
                  Drop your email and we'll let you know<br />when we go live!
                </p>
                <form className="modal-form" onSubmit={handleSubmit}>
                  <input
                    type="email"
                    className="modal-input"
                    id="notify-email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    autoFocus
                    disabled={loading}
                  />
                  <button type="submit" className="modal-submit" id="notify-submit" disabled={loading}>
                    {loading ? 'Sending...' : 'Subscribe'}
                  </button>
                </form>
                {error && <p className="modal-error">{error}</p>}
              </>
            ) : (
              <div className="modal-success">
                <div className="success-check">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h2 className="modal-title">You're on the list!</h2>
                <p className="modal-desc">We'll notify you when we launch.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default App

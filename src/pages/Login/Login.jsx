import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faLock, faSpinner, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { useAdmin } from '../../context/AdminContext'

function Login() {
  const navigate = useNavigate()
  const { login } = useAdmin()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [touched, setTouched] = useState({ email: false, password: false })

  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  const isPasswordValid = password.length >= 6
  const isFormValid = email && password && isEmailValid && isPasswordValid

  const handleBlur = (field) => {
    setTouched(prev => ({ ...prev, [field]: true }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!email || !password) {
      setError('Por favor completa todos los campos')
      return
    }

    if (!isEmailValid) {
      setError('Por favor ingresa un correo electrónico válido')
      return
    }

    if (!isPasswordValid) {
      setError('La contraseña debe tener al menos 6 caracteres')
      return
    }

    setLoading(true)

    try {
      await login(email, password)
      navigate('/admin', { replace: true })
    } catch (err) {
      setError(err.message || 'Error al iniciar sesión. Intenta de nuevo.')
      setPassword('')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen relative flex items-center justify-center bg-gradient-to-br from-primary to-secondary p-6 overflow-hidden">
      {/* Patrón de fondo animado */}
      <div className="absolute inset-0 opacity-10 z-0 pointer-events-none">
        <div className="absolute w-[400px] h-[400px] bg-[radial-gradient(circle,rgba(255,255,255,0.5)_1px,transparent_1px)] bg-[length:50px_50px] animate-move-pattern"></div>
      </div>

      <div className="relative z-10 w-full max-w-[420px]">
        <div className="bg-white rounded-xl shadow-2xl p-8 md:p-12 animate-slide-in">

          <div className="text-center mb-8">
            <div className="font-title text-4xl font-bold tracking-tight flex justify-center gap-1 select-none">
              <span className="text-primary">DU</span>
              <span className="text-accent">KICKS</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-6" noValidate>
            {error && (
              <div className="p-4 rounded-md mb-2 text-sm font-semibold bg-red-50 text-error border border-error/20 animate-slide-in">
                <span>{error}</span>
              </div>
            )}

            {/* Campo Email */}
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-sm font-semibold text-primary uppercase tracking-wide">
                Correo Electrónico
              </label>
              <div className={`
                relative flex items-center bg-light border-2 rounded-md px-4 transition-all duration-200
                focus-within:bg-white focus-within:border-accent focus-within:shadow-md
                ${touched.email && !isEmailValid && email ? 'border-error bg-red-50' : 'border-transparent'}
              `}>
                <FontAwesomeIcon icon={faEnvelope} className="text-gray-600 text-base mr-3 shrink-0" />
                <input
                  id="email"
                  type="email"
                  placeholder="admin@dukicks.com"
                  className="flex-1 bg-transparent border-none outline-none py-3 text-base text-primary font-text placeholder:text-gray-600/70 disabled:cursor-not-allowed disabled:text-gray-600"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onBlur={() => handleBlur('email')}
                  disabled={loading}
                />
              </div>
              {touched.email && !isEmailValid && email && (
                <span className="text-xs text-error font-semibold animate-slide-in">
                  Por favor ingresa un correo válido
                </span>
              )}
            </div>

            {/* Campo Contraseña */}
            <div className="flex flex-col gap-2">
              <label htmlFor="password" className="text-sm font-semibold text-primary uppercase tracking-wide">
                Contraseña
              </label>
              <div className={`
                relative flex items-center bg-light border-2 rounded-md px-4 transition-all duration-200
                focus-within:bg-white focus-within:border-accent focus-within:shadow-md
                ${touched.password && !isPasswordValid && password ? 'border-error bg-red-50' : 'border-transparent'}
              `}>
                <FontAwesomeIcon icon={faLock} className="text-gray-600 text-base mr-3 shrink-0" />
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  className="flex-1 bg-transparent border-none outline-none py-3 text-base text-primary font-text placeholder:text-gray-600/70 disabled:cursor-not-allowed disabled:text-gray-600"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onBlur={() => handleBlur('password')}
                  disabled={loading}
                />
                <button
                  type="button"
                  className="bg-transparent border-none text-gray-600 cursor-pointer p-2 ml-1 rounded-md transition-all flex items-center justify-center text-base hover:text-accent hover:bg-accent/10 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                  disabled={loading}
                >
                  <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                </button>
              </div>
              {touched.password && !isPasswordValid && password && (
                <span className="text-xs text-error font-semibold animate-slide-in">
                  La contraseña debe tener mínimo 6 caracteres
                </span>
              )}
            </div>

            <button
              type="submit"
              className="
                w-full py-4 px-6 mt-2 bg-gradient-to-br from-accent to-secondary text-white border-none rounded-md
                text-base font-bold uppercase tracking-wide cursor-pointer transition-all flex items-center justify-center gap-2
                shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none
              "
              disabled={!isFormValid || loading}
            >
              {loading ? (
                <>
                  <FontAwesomeIcon icon={faSpinner} className="animate-spin" />
                  <span>Iniciando sesión...</span>
                </>
              ) : (
                <span>Iniciar Sesión</span>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login
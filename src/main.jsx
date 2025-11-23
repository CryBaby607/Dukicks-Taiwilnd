import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import * as Sentry from "@sentry/react" // <--- AGREGADO
import { BrowserTracing } from "@sentry/tracing" // <--- AGREGADO
import App from './App.jsx'

// ✅ INICIALIZAR SENTRY
Sentry.init({
  dsn: import.meta.env.VITE_SENTRY_DSN,
  environment: import.meta.env.MODE,
  integrations: [
    new BrowserTracing(),
    new Sentry.Replay({
      maskAllText: true,
      blockAllMedia: true,
    })
  ],
  // Ajusta estos valores en producción (ej. 0.1 o 0.01)
  tracesSampleRate: 1.0, 
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
})

// ✅ WRAPPEAR APP CON PROFILER
const SentryApp = Sentry.withProfiler(App)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <SentryApp />
    </BrowserRouter>
  </StrictMode>,
)
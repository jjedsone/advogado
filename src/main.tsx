import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { setupErrorHandler } from './utils/errorHandler.ts'

// Configurar tratamento de erros para ignorar erros de extensões
setupErrorHandler()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Routes } from '@generouted/react-router'
import App from './App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App>
      <Routes />
    </App>
  </StrictMode>,
)

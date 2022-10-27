import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { CalculatorContextProvider } from './state/CalculatorContext'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <CalculatorContextProvider>
      <App />
    </CalculatorContextProvider>
  </React.StrictMode>
)

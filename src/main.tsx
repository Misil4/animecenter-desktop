import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './App.css'
import dotenv from 'dotenv'
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
      <App />
)

postMessage({ payload: 'removeLoading' }, '*')

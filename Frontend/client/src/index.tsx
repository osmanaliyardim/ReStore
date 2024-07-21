import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './app/layout/App'
import './app/layout/styles.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* This is the highest level component of React (App - App.tsx) */}
    <App />
  </React.StrictMode>
)

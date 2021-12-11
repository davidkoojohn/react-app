import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter } from "react-router-dom"
import './index.css'
import App from './App/App'
import "tailwindcss/tailwind.css"

ReactDOM.render(
  <HashRouter>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </HashRouter>,
  document.getElementById('root')
)

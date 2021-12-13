import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter } from "react-router-dom"
import { Provider } from "react-redux"
import store from "./store"
import App from './App/App'
import './index.css'
import "tailwindcss/tailwind.css"

ReactDOM.render(
  <HashRouter>
    <React.StrictMode>
      <Provider store={ store }>
        <App />
      </Provider>
    </React.StrictMode>
  </HashRouter>,
  document.getElementById('root')
)

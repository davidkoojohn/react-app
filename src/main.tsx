import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter } from "react-router-dom"
import './index.css'
import App from './App/App'
import "tailwindcss/tailwind.css"

import store from "./store"
import { addToCart, updateCart, deleteFromCart } from "./store/actions/cart_actions"

console.log("initial state: ", store.getState());

let unsubscribe = store.subscribe(() => {
  console.log("store change:", store.getState());
})

store.dispatch(addToCart('Coffee 500gm', 1, 250));
store.dispatch(addToCart('Flour 1kg', 2, 110));
store.dispatch(addToCart('Juice 2L', 1, 250));

store.dispatch(updateCart("Coffee 500gm", 111, 23))
store.dispatch(deleteFromCart("Flour 1kg"))

unsubscribe()

ReactDOM.render(
  <HashRouter>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </HashRouter>,
  document.getElementById('root')
)

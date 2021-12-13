import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter } from "react-router-dom"
import './index.css'
import App from './App/App'
import "tailwindcss/tailwind.css"


import { createStore, combineReducers } from "redux"

const productsReducer = (state: any = [], action: any) => {
  return state
}

const initialState = {
  cart: [
    {
      product: "bread 700g",
      quantity: 2,
      unitCost: 90
    },
    {
      product: "milk 500ml",
      quantity: 1,
      unitCost: 35
    },
  ]
}
const ADD_TO_CART = "ADD_TO_CART"
const cartReducer = (state: any = initialState, action: any) => {
  switch (action.type) {
    case ADD_TO_CART: {
      return {
        ...state,
        cart: [...state.cart, action.payload]
      }
    }
    default:
      return state
  }
}

function addToCart(procuct: string, quantity: number, unitCost: number) {
  return {
    type: ADD_TO_CART,
    payload: { procuct, quantity, unitCost }
  }
}

const globalReducer = (state: any = [], action: any) => {
  return state
}

const allReducer = {
  productsReducer,
  cartReducer,
  globalReducer
}

const rootReducer = combineReducers(allReducer)
const store = createStore(rootReducer)
console.log(store)
console.log("initial state: ", store.getState());


let unsubscribe = store.subscribe(() => {
  console.log("store change:", store.getState());
})

store.dispatch(addToCart('Coffee 500gm', 1, 250));
store.dispatch(addToCart('Flour 1kg', 2, 110));
store.dispatch(addToCart('Juice 2L', 1, 250));


unsubscribe()

ReactDOM.render(
  <HashRouter>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </HashRouter>,
  document.getElementById('root')
)

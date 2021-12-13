import { ADD_TO_CART, DELETE_FROM_CART, UPDATE_CART } from "../types/cart_types"

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

export default (state: any = initialState, action: any) => {
  switch (action.type) {
    case ADD_TO_CART: {
      return {
        ...state,
        cart: [...state.cart, action.payload]
      }
    }
    case UPDATE_CART: {
      return {
        ...state,
        cart: state.cart.map((item: any) => {
          return item.product === action.payload.product ? action.payload : item
        })
      }
    }
    case DELETE_FROM_CART: {
      return {
        ...state,
        cart: state.cart.filter((item: any) => item.product !== action.payload.product)
      }
    }
    default:
      return state
  }
}




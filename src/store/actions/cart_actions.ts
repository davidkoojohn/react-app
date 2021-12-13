import {ADD_TO_CART, DELETE_FROM_CART, UPDATE_CART} from "../types/cart_types"

export function addToCart(product: string, quantity: number, unitCost: number) {
  return {
    type: ADD_TO_CART,
    payload: { product, quantity, unitCost }
  }
}

export function updateCart(product: string, quantity: number, unitCost: number) {
  return {
    type: UPDATE_CART,
    payload: { product, quantity, unitCost }
  }
}

export function deleteFromCart(product: any) {
  return {
    type: DELETE_FROM_CART,
    payload: {
      product
    }
  }
}





import { ADD_TO_CART } from "../types/cart_types"

export function addToCart(procuct: string, quantity: number, unitCost: number) {
  return {
    type: ADD_TO_CART,
    payload: { procuct, quantity, unitCost }
  }
}





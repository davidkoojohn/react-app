import { combineReducers } from "redux"
import cartReducer from "./cart_reducer"
import productsReducer from "./products_reducer"

const allReducer = {
  productsReducer,
  cartReducer,
}

const rootReducer = combineReducers(allReducer)
export default rootReducer

import { combineReducers } from "redux"
import cartReducer from "./cart_reducer"
import productsReducer from "./products_reducer"
import todoReducer from "./todo_reducer"

const allReducer = {
  productsReducer,
  cartReducer,
  todoReducer
}

const rootReducer = combineReducers(allReducer)
export default rootReducer

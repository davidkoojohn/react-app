import { combineReducers } from "redux"
import cartReducer from "./cart_reducer"
import productsReducer from "./products_reducer"
import todoReducer from "./todo_reducer"
import visibilityFilter from "./visibility_filter_reducer"
import { postsBySubreddit, selectedSubreddit } from "./reddit_reducer"
import { newsByList, selectedNewsChannel } from "./news_reducer"

const allReducer = {
  productsReducer,
  cartReducer,
  todoReducer,
  visibilityFilter,
  postsBySubreddit,
  selectedSubreddit,
  newsByList,
  selectedNewsChannel
}

const rootReducer = combineReducers(allReducer)
export type RootState = ReturnType<typeof rootReducer>
export default rootReducer

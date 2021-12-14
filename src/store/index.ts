import { createStore, applyMiddleware } from "redux"
import thunkMiddleware from "redux-thunk"
import { createLogger } from "redux-logger"
import { composeWithDevTools } from "redux-devtools-extension"
import rootReducer from "./reducers";

import { selectSubreddit, fetchPosts, fetchPostsIfNeeded } from "./actions/reddit_actions"

const loggerMiddleware = createLogger()

const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(
      loggerMiddleware,
      thunkMiddleware,
    )
  )
)

/*
store.dispatch(selectSubreddit('reactjs'))

store.dispatch<any>(fetchPosts('reactjs'))
store.dispatch<any>(fetchPostsIfNeeded('reactjs'))
*/

export default store

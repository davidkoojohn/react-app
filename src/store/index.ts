import { createStore, applyMiddleware } from "redux"
import thunkMiddleware from "redux-thunk"
import { createLogger } from "redux-logger"
import { composeWithDevTools } from "redux-devtools-extension"
import rootReducer from "./reducers";

const loggerMiddleware = createLogger()


function configureStore(preloadState: any = undefined) {
  const middlewares = [thunkMiddleware, loggerMiddleware]
  const middlewareEnhancer = applyMiddleware(...middlewares)
  const composedEnhancers = composeWithDevTools(middlewareEnhancer)

  return createStore(
    rootReducer,
    preloadState,
    composedEnhancers,
  )
}

export default configureStore()

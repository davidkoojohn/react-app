import React, { lazy, Suspense } from 'react'
import { Routes, Route } from "react-router-dom"

import { RouterDemo, Articles, Article, NewArticle, UpdateArticle, ArticleLayout, NotFound } from "../Views/RouterDemo/RouterDemo"
const AppHeader = lazy(() => import("./AppHeader"))
const Landing = lazy(() => import("../Views/Landing/Landing"))
const About = lazy(() => import("../Views/About/About"))
const Express = lazy(() => import("../Views/Express/Express"))
const HookDemo = lazy(() => import("../Views/Express/HookDemo"))
const Patterns = lazy(() => import("../Views/Express/Patterns"))
const TodoList = lazy(() => import("../Views/Express/TodoList"))
const Dashboard = lazy(() => import("../Views/Express/Dashboard"))
const ReduxDemo = lazy(() => import("../Views/ReduxDemo/ReduxDemo"))
const TodoApp = lazy(() => import("../Views/ReduxDemo/TodoApp"))
const AsyncApp = lazy(() => import("../Views/ReduxDemo/Async"))
const NewsApp = lazy(() => import("../Views/News/News"))
const BetaApp = lazy(() => import("../Views/Beta/Beta"))
const Learn = lazy(() => import("../Views/Beta/Learn"))

function App() {
  return (
    <div className="App">
      <Suspense fallback={ <div>Header Loading...</div> }>
        <AppHeader/>
      </Suspense>
      <main className={"px-4"}>
        <Suspense fallback={ <div>Loading...</div> }>
          <Routes>
            <Route path={"/"} element={ <Landing/> } />
            <Route path={"about"} element={ <About/> } />
            <Route path={"news"} element={ <NewsApp/> } />
            <Route path={"beta"} element={ <BetaApp/> }>
              <Route index element={ <Learn/> }/>
            </Route>
            <Route path={"router"} element={ <RouterDemo/> }>
              <Route path={"articles"} element={ <ArticleLayout/> }>
                <Route index element={ <Articles/> }/>
                <Route path={":id"} element={ <Article/> }/>
                <Route path={"new"} element={ <NewArticle/> }/>
                <Route path={":id/update"} element={ <UpdateArticle/> }/>
                <Route path={"*"} element={ <NotFound/> }/>
              </Route>
            </Route>
            <Route path={"redux"} element={ <ReduxDemo/> }>
              <Route index element={<TodoApp/>}/>
              <Route path={"async"} element={<AsyncApp/>}/>
            </Route>
            <Route path={"express"} element={ <Express/> }>
              <Route index element={ <HookDemo/> }/>
              <Route path={"patterns"} element={ <Patterns/> }/>
              <Route path={"todolist"} element={ <TodoList/> } />
              <Route path={"dashboard"} element={ <Dashboard/> } />
            </Route>
          </Routes>
        </Suspense>
      </main>
    </div>
  )
}

export default App

import React, { lazy, Suspense } from 'react'
import { Routes, Route, Link } from "react-router-dom"
import logo from '../assets/logo.svg'

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

function App() {
  return (
    <div className="App">
      <header className={"px-4 flex items-center text-white bg-gray-900 h-16"}>
        <img src={logo} className="h-12 animate-pulse" alt="logo" />
        <div>
          <Link className={"hover:underline"} to={"/"}>Home</Link>
          <span className={"mx-2"}>|</span>
          <Link className={"hover:underline"} to={"/news"}>News</Link>
          <span className={"mx-2"}>|</span>
          <Link className={"hover:underline"} to={"/redux"}>Redux</Link>
          <span className={"mx-2"}>|</span>
          <Link className={"hover:underline"} to={"/express"}>Express</Link>
          <span className={"mx-2"}>|</span>
          <Link className={"hover:underline"} to={"/about"}>About</Link>
        </div>
      </header>
      <main className={"px-4"}>
        <Suspense fallback={ <div>Loading...</div> }>
          <Routes>
            <Route path={"/"} element={ <Landing/> } />
            <Route path={"about"} element={ <About/> } />
            <Route path={"news"} element={ <NewsApp/> } />
            <Route path={"redux"} element={ <ReduxDemo/> }>
              <Route path={"todo"} element={<TodoApp/>}/>
              <Route path={"async"} element={<AsyncApp/>}/>
            </Route>
            <Route path={"express"} element={ <Express/> }>
              <Route path={"hooks"} element={ <HookDemo/> }/>
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

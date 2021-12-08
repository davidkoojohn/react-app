import React, { lazy, Suspense } from 'react'
import { Routes, Route, Link } from "react-router-dom"
import logo from '../logo.svg'
import './App.css'

const Landing = lazy(() => import("../Views/Landing/Landing"))
const About = lazy(() => import("../Views/About/About"))

function App() {
  return (
    <div className="App">
      <header>
        <img src={logo} className="App-logo" alt="logo" />
        <div>
          <Link to={"/"}>Home</Link>
          <span>|</span>
          <Link to={"/about"}>About</Link>
        </div>
      </header>
      <main>
        <Suspense fallback={ <div>Loading...</div> }>
          <Routes>
            <Route path={"/"} element={ <Landing/> } />
            <Route path={"about"} element={ <About/> } />
          </Routes>
        </Suspense>
      </main>
    </div>
  )
}

export default App

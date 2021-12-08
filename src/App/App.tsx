import { useState } from 'react'
import { Routes, Route, Link } from "react-router-dom"
import logo from '../logo.svg'
import './App.css'


function About() {
  return (
    <h1>About</h1>
  )
}

function Landing() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1>Landing</h1>
      <p>
        <button type="button" onClick={() => setCount((count) => count + 1)}>
          count is: {count}
        </button>
      </p>
    </>
  )
}

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
        <Routes>
          <Route path={"/"} element={ <Landing/> } />
          <Route path={"about"} element={ <About/> } />
        </Routes>
      </main>
    </div>
  )
}

export default App

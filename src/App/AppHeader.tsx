import logo from "../assets/logo.svg";
import {Link} from "react-router-dom";
import React from "react";


const AppHeader = () => (
  <header className={"px-4 flex items-center text-white bg-gray-900 h-16"}>
    <img src={logo} className="h-12 animate-pulse" alt="logo" />
    <div>
      <Link className={"hover:underline"} to={"/"}>Home</Link>
      <span className={"mx-2"}>|</span>
      <Link className={"hover:underline"} to={"/news"}>News</Link>
      <span className={"mx-2"}>|</span>
      <Link className={"hover:underline"} to={"/router"}>Router</Link>
      <span className={"mx-2"}>|</span>
      <Link className={"hover:underline"} to={"/redux"}>Redux</Link>
      <span className={"mx-2"}>|</span>
      <Link className={"hover:underline"} to={"/express"}>Express</Link>
      <span className={"mx-2"}>|</span>
      <Link className={"hover:underline"} to={"/about"}>About</Link>
    </div>
  </header>
)

export default AppHeader

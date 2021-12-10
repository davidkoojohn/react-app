import { Outlet, Link } from "react-router-dom"


export default function Express() {
  return (
    <div>
      <div className="flex items-end py-4">
        <h1 className="text-3xl">React Express</h1>
        <nav className={"mx-4"}>
          <Link className={"hover:underline"} to={"/express/dashboard"}>Dashboard</Link>
          <span className={"mx-2"}>|</span>
          <Link className={"hover:underline"} to={"/express/todolist"}>Todolist</Link>
          <span className={"mx-2"}>|</span>
          <Link className={"hover:underline"} to={"/express/hooks"}>Hooks</Link>
          <span className={"mx-2"}>|</span>
          <Link className={"hover:underline"} to={"/express/patterns"}>Patterns</Link>
        </nav>
      </div>
      <hr/>
      <Outlet/>
    </div>
  )
}



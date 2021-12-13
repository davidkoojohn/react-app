import {Link, Outlet} from "react-router-dom";

export default function ReduxDemo() {
  return (
    <div>
      <div className="flex items-end py-4">
        <h1 className="text-3xl">Redux</h1>
        <nav className={"mx-4"}>
          <Link className={"hover:underline"} to={"/redux/todo"}>Todo</Link>
          <span className={"mx-2"}>|</span>
        </nav>
      </div>
      <hr/>
      <Outlet/>
    </div>
  )
}


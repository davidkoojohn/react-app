import { Outlet, NavLink, useNavigate, useParams, useSearchParams, useLocation } from "react-router-dom";

export const RouterDemo = () => {
  return (
    <>
      <h1>RouterDemo Index</h1>
      <Outlet/>
    </>
  )
}

export const ArticleLayout = () => {
  const navigate = useNavigate()
  return (
    <>
      <h1>ArticleLayout</h1>
      <NavLink
        to={"/router/articles"}
        className={
          (isActive) => isActive ? "bg-red-600" : ""
        }
      >
        articles
      </NavLink> |{" "}
      <NavLink to={"new"}>new articles</NavLink> |{" "}
      <button onClick={() => navigate("/router/articles/23")}>article:23</button> |{" "}
      <button onClick={() => navigate("/router/articles/12")}>article:12</button> |{" "}
      <button
        onClick={
          () => navigate("/router/articles?brand=nike&sort=asc&sortby=price")
        }
      >
        articles?query=val...
      </button> |{" "}
      <hr/>
      <Outlet/>
    </>
  )
}

export const Articles = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const location = useLocation()
  // console.log(location)
  // console.log(location.search)
  console.log(searchParams.getAll("brand"))
  for (let item of searchParams.keys()) {
    console.log(item)
  }
  // console.log(searchParams.get("filter"))
  // console.log(searchParams.get("brand"))
  return (
    <>
      <h1>Articles Index</h1>
      <h1>{searchParams.get("brand")}</h1>
      <h1>{searchParams.get("filter")}</h1>
      <button
        onClick={
          () => setSearchParams({filter: "all"})
        }
      >
        set search params
      </button>
    </>
  )
}

export const Article = () => {
  const params = useParams()

  return (
    <h1>Article Show - { params.id }</h1>
  )
}

export const NewArticle = () => {
  return (
    <h1>Article Create</h1>
  )
}

export const UpdateArticle = () => {
  return (
    <h1>Article Update</h1>
  )
}

export const NotFound = () => (
  <h1>Not Found</h1>
)

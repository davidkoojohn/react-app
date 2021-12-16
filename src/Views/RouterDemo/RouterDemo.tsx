import {Outlet} from "react-router-dom";

export const RouterDemo = () => {
  return (
    <>
      <h1>RouterDemo Index</h1>
      <Outlet/>
    </>
  )
}

export const ArticleLayout = () => {
  return (
    <>
      <h1>ArticleLayout</h1>
      <hr/>
      <Outlet/>
    </>
  )
}

export const Articles = () => {
  return (
    <h1>Articles Index</h1>
  )
}

export const Article = () => {
  return (
    <h1>Article Show</h1>
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

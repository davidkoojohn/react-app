import {connect} from "react-redux";
import { selectSubreddit, fetchPostsIfNeeded } from "../../store/actions/reddit_actions"

interface IPickerProps {
  value: string
  options: string[]
  onChange: (value: string) => void
}
const Picker = ({ options, value, onChange }: IPickerProps) => {
  return (
    <div className={"flex"}>
      <h1>{value}</h1>
      <select className={"border px-2"} value={value} onChange={e => onChange(e.target.value)}>
        {options.map(item => <option key={item}>{item}</option>)}
      </select>
    </div>
  )
}

type PostItem = {
  title: string
}
interface IPostProps {
  posts: PostItem[]
}
const Posts = ({ posts }: IPostProps) => {
  return (
    <ul>
      {posts.map((item, index) =>
        <li key={item.title} className={"hover:underline"}>{index + 1}. {item.title}</li>
      )}
    </ul>
  )
}

interface IAsyncAppProps {
  selectedSubreddit: string
  dispatchSelectedSubreddit: (value: string) => void
  posts: PostItem[]
  isFetching: boolean
  lastUpdated: number
  fetchPosts: (value: string) => void
}
const AsyncApp = connect(
  (state: any) => {
    const { selectedSubreddit, postsBySubreddit } = state
    const { isFetching = true, lastUpdated = 0, items: posts = [] } = postsBySubreddit[selectedSubreddit] || {}
    return {
      selectedSubreddit,
      isFetching,
      lastUpdated,
      posts
    }
  },
  (dispatch: any) => ({
    dispatchSelectedSubreddit: (value: string) => dispatch(selectSubreddit(value)),
    fetchPosts: (selectedSubreddit: string) => dispatch(fetchPostsIfNeeded(selectedSubreddit))
  })
)(({ selectedSubreddit, dispatchSelectedSubreddit, posts, fetchPosts }: IAsyncAppProps) => {

  fetchPosts(selectedSubreddit)

  const handleChange = (value: string) => {
    dispatchSelectedSubreddit(value)
  }

  return (
    <>
      <h1>Async</h1>
      <Picker
        value={selectedSubreddit}
        options={["reactjs", "frontend"]}
        onChange={handleChange}
      />
      <Posts posts={posts}/>
    </>
  )
})

export default AsyncApp

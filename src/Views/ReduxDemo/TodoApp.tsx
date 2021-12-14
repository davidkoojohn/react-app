import {ReactNode, useState} from "react";
import { connect } from "react-redux"
import { TodoItem } from "../../store/reducers/todo_reducer"

interface ITodoProps {
  onClick: () => void
  text: string
  completed: boolean
}
const Todo = ({ text, completed, onClick }: ITodoProps) => (
  <li
    onClick={onClick}
    className={`${completed && "line-though"}`}
  >
    {text}
  </li>
)

interface ITodoListProps {
  onClick: (id: number) => void
  todos: TodoItem[]
}

const TodoList = connect(
  (state: any) => ({
    todos: state.todoReducer
  }),
  (dispatch) => ({})
)(({ todos, onClick }: ITodoListProps) => {
  const empty = <div>No data!</div>
  const list = todos.map(item => (
    <Todo
      key={item.id}
      onClick={() => onClick(item.id)}
      { ...item }
    />
  ))

  return (
    <ul>
      {todos.length === 0 ? empty : list}
    </ul>
  )
})

interface ITodoLinkProps {
  active?: boolean
  children: ReactNode
  onClick?: () => void
}
const TodoLink = ({ active, children, onClick }: ITodoLinkProps) => {
  if (active) {
    return <span>{ children }</span>
  }
  return (
    <a
      href=""
      onClick={
        event => {
          event.preventDefault()
        }
      }
    >
      {children}
    </a>
  )
}

const FilterFooter = () => (
  <div className={"border px-2 py-2"}>
    Show: <TodoLink>All</TodoLink>
    {', '}
    <TodoLink>Active</TodoLink>
    {', '}
    <TodoLink>Completed</TodoLink>
  </div>
)

function AddTodo () {
  const [text, setText] = useState<string>("")
  return (
    <div>
      <form
        className={"flex h-10"}
        onSubmit={
          event => {
            event.preventDefault()
            if (!text.trim()) {
              return
            }
            console.log(text)
            setText("")
          }
        }
      >
        <input
          className={"border px-2 focus:outline-none"}
          type="text"
          value={text}
          onChange={event => setText(event.target.value)}
        />
        <button className={"border"} type="submit">Add Todo</button>
      </form>
    </div>
  )
}

export default function TodoApp () {
  return (
    <>
      <AddTodo/>
      <TodoList onClick={(id) => console.log(id)}/>
      <FilterFooter/>
    </>
  )
}


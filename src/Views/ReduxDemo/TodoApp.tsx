import {ReactNode, useState} from "react";
import { connect } from "react-redux"
import { TodoItem } from "../../store/reducers/todo_reducer"
import { toggleTodo, addTodo, setVisibility } from "../../store/actions/todo_actions"
import { VisibilityFilters } from "../../store/types/todo_types"

interface ITodoProps {
  onClick: () => void
  text: string
  completed: boolean
}
const Todo = ({ text, completed, onClick }: ITodoProps) => (
  <li
    onClick={onClick}
    className={`${completed && "line-through"}`}
  >
    {text}
  </li>
)

interface ITodoListProps {
  toggleTodo: (id: number) => void
  todos: TodoItem[]
}

const TodoList = connect(
  (state: any) => ({
    todos: state.todoReducer
  }),
  (dispatch) => ({
    toggleTodo: (id: number) => dispatch(toggleTodo(id))
  })
)(({ todos, toggleTodo }: ITodoListProps) => {
  const empty = <div>No data!</div>
  const list = todos.map(item => (
    <Todo
      key={item.id}
      onClick={() => toggleTodo(item.id)}
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
  filter: VisibilityFilters
  active: VisibilityFilters
  children: ReactNode
  onClick: (filter: VisibilityFilters) => void
}

const FilterLink = connect(
  (state: any) => ({
    active: state.visibilityFilter
  }),
  (dispatch) => ({
    onClick: (filter: VisibilityFilters) => dispatch(setVisibility(filter))
  })
)(({ active, children, filter, onClick }: ITodoLinkProps) => {
  if (active === filter) {
    return <span className={"border px-2 mx-2 bg-green-400 inline-block"}>{ children }</span>
  }
  return (
    <button
      className={"border px-2 mx-2"}
      onClick={() => onClick(filter)}
    >
      {children}
    </button>
  )
})

const FilterFooter = () => (
  <div className={"border px-2 py-2"}>
    Show: <FilterLink filter={VisibilityFilters.SHOW_ALL}>All</FilterLink>
    {', '}
    <FilterLink filter={VisibilityFilters.SHOW_ACTIVE}>Active</FilterLink>
    {', '}
    <FilterLink filter={VisibilityFilters.SHOW_COMPLETED}>Completed</FilterLink>
  </div>
)

interface IAddTodoProps {
  onClick: (text: string) => void
}
const AddTodo = connect(
  null,
  (dispatch) => ({
    onClick: (text: string) => dispatch(addTodo(text))
  })
)(({ onClick }: IAddTodoProps) => {
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
            onClick(text)
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
})

export default function TodoApp () {
  return (
    <>
      <AddTodo/>
      <TodoList/>
      <FilterFooter/>
    </>
  )
}


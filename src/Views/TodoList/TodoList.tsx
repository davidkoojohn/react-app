import {CSSProperties, useEffect, useState} from "react";

const styled: Record<string, CSSProperties> = {
  item: {
    height: "2em",
    lineHeight: "2em",
    borderBottom: "1px solid #aaa",
  }
}

type ITodoItem = {
  id: number
  title: string
  completed: boolean
}
type ITodoList = ITodoItem[]
type IFilter = "all" | "completed" | "uncompleted"


interface IFormProps {
  itemText: string
  setItemText: (text: string) => void
  onSubmit: () => void
  filterState: string
  setFilterState: (text: string) => void
}

function Form({ itemText, setItemText, filterState, setFilterState, onSubmit }: IFormProps) {
  return (
    <div className={"flex flex-col border p-2"}>
      <form
        className={"w-full"}
        onSubmit={
          event => {
            event.preventDefault()
            onSubmit()
            setItemText("")
          }
        }
      >
        <input
          className={"border border-gray-400 mb-2 w-full"}
          type="text"
          placeholder={"What needs to be done?"}
          value={itemText}
          onChange={e => setItemText(e.target.value)}
        />
      </form>
      <label>
        <span className={"mr-2"}>Filter</span>
        <select
          className={"border border-gray-400"}
          value={filterState}
          onChange={e => {
            setFilterState(e.target.value)
          }}
        >
          <option value={"all"}>All</option>
          <option value={"completed"}>Completed</option>
          <option value={"uncompleted"}>Uncompleted</option>
        </select>
      </label>
    </div>
  )
}

interface IListProps {
  data: ITodoList
  filterState: string
  onDelete: (item: ITodoItem) => void
}
function List({ data, onDelete, filterState }: IListProps) {
  const cnameMethod = (completed: boolean) => {
    return `px-2 ${completed ? "line-through bg-gray-300" : "bg-yellow-200"}`
  }

  const filterData = () => {
    if (filterState === "completed") {
      return data.slice().filter(it => it.completed)
    } else if (filterState === "uncompleted") {
      return data.slice().filter(it => !it.completed)
    }
    return data.slice()
  }

  return (
    <ul>
      {filterData().map(item => (
        <li
          key={item.id.toString()}
          className={cnameMethod(item.completed)}
          style={styled.item}
          onClick={() => {
            onDelete({
              ...item,
              completed: !item.completed
            })
          }}
        >
          {item.title}
        </li>
      ))}
    </ul>
  )
}

interface IBottomOptProps {
  onClear: () => void
  disabled: boolean
}
function BottomOpt({ onClear, disabled }: IBottomOptProps) {
  return (
    <div className={"mt-2"}>
      <button
        disabled={disabled}
        className={"border px-2 py-1 "+`${disabled ? "bg-gray-200" : "bg-green-200"}`}
        onClick={() => onClear()}
      >
        Remove completed items.
      </button>
    </div>
  )
}

export default function TodoList() {
  const [itemText, setItemText] = useState<string>("")
  const [filterState, setFilterState] = useState<string>("all")

  const [listState, setListState] = useState<ITodoList>([
    { id: 1, title: "item 1", completed: false },
    { id: 2, title: "item 22", completed: true },
    { id: 3, title: "item 333", completed: false },
  ])
  const unAbleClear = !listState.some(it => it.completed)

  const handDelete = (item: ITodoItem) => {
    const findIndex = listState.findIndex(it => it.id === item.id).toString()
    if(findIndex) {
      const list = listState.slice()
      list[+findIndex] = item
      setListState(list)
    }
  }

  const handleSubmit = () => {
    setListState([...listState, {
      id: Date.now(),
      title: itemText,
      completed: false
    }])
  }

  const handleClearCompleted = () => {
    setListState(listState.slice().filter(it => !it.completed))
  }

  return (
    <div className={""}>
      <div className={"text-3xl py-4"}>TodoList</div>
      <Form
        filterState={filterState}
        setFilterState={setFilterState}
        itemText={itemText}
        setItemText={setItemText}
        onSubmit={handleSubmit}
      />
      <List data={listState} onDelete={handDelete} filterState={filterState}/>
      <BottomOpt disabled={unAbleClear} onClear={handleClearCompleted}/>
    </div>
  )
}


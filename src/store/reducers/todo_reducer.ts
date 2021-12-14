
const ADD_TODO = "ADD_TODO"
const TOGGLE_TODO = "TOGGLE_TODO"

export type TodoItem = {
  id: number
  text: string
  completed: boolean
}

const initialState = [
  { id: 1, completed: false, text: "item1" },
  { id: 2, completed: true, text: "item2" },
  { id: 3, completed: false, text: "item3" },
] as TodoItem[]

export default function (state = initialState, action: any) {
  return initialState
}

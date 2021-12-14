import { ADD_TODO, TOGGLE_TODO, SET_VISIBILITY_FILTER, VisibilityFilters } from "../types/todo_types"

export const addTodo = (text: string) => {
  return {
    type: ADD_TODO,
    id: Date.now(),
    text,
  }
}

export const toggleTodo = (id: number) => {
  return {
    type: TOGGLE_TODO,
    id,
  }
}

export const setVisibility = (filter: VisibilityFilters) => {
  return {
    type: SET_VISIBILITY_FILTER,
    filter
  }
}


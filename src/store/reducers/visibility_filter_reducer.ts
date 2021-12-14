import {SET_VISIBILITY_FILTER, VisibilityFilters} from "../types/todo_types"

export default (state: VisibilityFilters = VisibilityFilters.SHOW_ALL, action: any) => {
  if (action.type === SET_VISIBILITY_FILTER) {
    return action.filter
  }
  return state
}


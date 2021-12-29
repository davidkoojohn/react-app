import { sculptureList } from "../../Views/Beta/data"
import { GET_CURRENT_SCULPTURE, TSculptureActionsTypes} from "../types/sculpture_types"

const initialState = {
  list: sculptureList,
  current: sculptureList[0]
}

export default function sculptureReducer(state: any = initialState, action: TSculptureActionsTypes) {
  switch (action.type) {
    case GET_CURRENT_SCULPTURE:
      return {
        ...state,
        current: state.list[action.index]
      }
    default:
      return state
  }
}




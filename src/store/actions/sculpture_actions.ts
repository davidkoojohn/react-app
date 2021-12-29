import { GET_CURRENT_SCULPTURE, TSculptureActionsTypes} from "../types/sculpture_types"

export function getCurrentSculpture(index: number): TSculptureActionsTypes {
  return {
    type: GET_CURRENT_SCULPTURE,
    index
  }
}



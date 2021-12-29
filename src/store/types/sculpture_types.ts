export const GET_CURRENT_SCULPTURE = "GET_CURRENT_SCULPTURE"

interface IGetCurrent {
  type: typeof GET_CURRENT_SCULPTURE
  index: number
}

export type TSculptureActionsTypes =
  | IGetCurrent



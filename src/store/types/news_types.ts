export const REQUEST_NEWS = 'REQUEST_NEWS'
export const RECEIVE_NEWS = 'RECEIVE_NEWS'
export const INVALIDATE_CHANNEL = 'INVALIDATE_CHANNEL'
export const SELECT_CHANNEL = "SELECT_CHANNEL"

export interface IChannel {
  title: string
  channel: string
}

interface ISelectChannel {
  type: typeof SELECT_CHANNEL
  channel: string
}

interface IInvalidateChannel {
  type: typeof INVALIDATE_CHANNEL
  channel: string
}

interface IRequestNews {
  type: typeof REQUEST_NEWS
  channel: string
}

interface IReceiveNews {
  type: typeof RECEIVE_NEWS
  channel: string,
  items: any[],
  receivedAt: number
}

export type TNewsActionTypes =
  | ISelectChannel
  | IInvalidateChannel
  | IRequestNews
  | IReceiveNews

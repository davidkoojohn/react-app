import {
  INVALIDATE_CHANNEL,
  REQUEST_NEWS,
  RECEIVE_NEWS,
  SELECT_CHANNEL,
  TNewsActionTypes,
  IChannel
} from "../types/news_types"


const channelState = {
  channels: [
    { title: "电视", channel: "BA10TA81wangning" },
    { title: "电影", channel: "BD2A9LEIwangning" },
    { title: "明星", channel: "BD2AB5L9wangning" },
    { title: "音乐", channel: "BD2AC4LMwangning" },
    { title: "体育", channel: "BA8E6OEOwangning" },
    { title: "财经", channel: "BA8EE5GMwangning" },
    { title: "军事", channel: "BAI67OGGwangning" },
    { title: "军情", channel: "DE0CGUSJwangning" },
  ] as IChannel[],
  currentChannel: ""
}

export function selectedNewsChannel(state = channelState, action: TNewsActionTypes) {
  switch (action.type) {
    case SELECT_CHANNEL:
      return {
        ...state,
        currentChannel: action.channel
      }
    default:
      return {
        ...state,
        currentChannel: state.channels[0].channel
      }
  }
}

export type TNews = {
  isFetching: boolean
  didInvalidate: boolean
  items: any[]
  lastUpdated?: number
}

const initialState = {
  isFetching: false,
  didInvalidate: false,
  items: []
} as TNews
function news(state: TNews = initialState, action: TNewsActionTypes): TNews {
  switch (action.type) {
    case INVALIDATE_CHANNEL:
      return {
        ...state,
        didInvalidate: true
      }
    case REQUEST_NEWS:
      return {
        ...state,
        isFetching: true,
        didInvalidate: false
      }
    case RECEIVE_NEWS:
      return {
        ...state,
        isFetching: false,
        didInvalidate: false,
        items: action.items,
        lastUpdated: action.receivedAt
      }
    default:
      return state
  }
}

export function newsByList(state: any = {}, action: TNewsActionTypes) {
  switch (action.type) {
    case INVALIDATE_CHANNEL:
    case REQUEST_NEWS:
    case RECEIVE_NEWS:
      return {
        ...state,
        [action.channel]: news(state[action.channel], action)
      }
    default:
      return state
  }
}



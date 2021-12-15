import {INVALIDATE_CHANNEL, RECEIVE_NEWS, REQUEST_NEWS, SELECT_CHANNEL, TNewsActionTypes} from "../types/news_types"
import jsonp from "jsonp"


export function selectChannel(channel: string): TNewsActionTypes {
  return {
    type: SELECT_CHANNEL,
    channel
  }
}

export function invalidateChannel(channel: string): TNewsActionTypes {
  return {
    type: INVALIDATE_CHANNEL,
    channel
  }
}

export function requestNews(channel: string): TNewsActionTypes {
  return {
    type: REQUEST_NEWS,
    channel
  }
}

export function receiveNews(channel: string, res: any): TNewsActionTypes {
  return {
    type: RECEIVE_NEWS,
    channel,
    items: res[channel],
    receivedAt: Date.now()
  }
}

export function fetchNews(channel: string) {
  return (dispatch: any) => {
    dispatch(requestNews(channel))

    return new Promise((resolve, reject) => {
      jsonp(`https://3g.163.com/touch/reconstruct/article/list/${channel}/1-5.html`, {
        name: "artiList"
      },function (err, res) {
        if (err) {
          reject(err)
        } else {
          resolve(res)
        }
      })
    }).then(json => {
      dispatch(receiveNews(channel, json))
      dispatch(selectChannel(channel))
    })
  }
}


export function shouldFetchNews(state: any, channel: string): boolean {
  const news = state.newsByList[channel]
  if (!news) {
    return true
  } else if (news.isFetching) {
    return false
  } else {
    return news.didInvalidate
  }
}

export function fetchNewsIfNeeded(channel: string) {
  return (dispatch: any, getState: any) => {
    if (shouldFetchNews(getState(), channel)) {
      return dispatch(fetchNews(channel))
    }
    return Promise.resolve()
  }
}



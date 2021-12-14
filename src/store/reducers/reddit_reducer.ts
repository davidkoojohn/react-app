import {
  SELECT_SUBREDDIT,
  RECEIVE_POSTS,
  REQUEST_POSTS,
  INVALIDATE_SUBREDDIT,
} from "../actions/reddit_actions"

export function selectedSubreddit(state = 'reactjs', action: any) {
  switch (action.type) {
    case SELECT_SUBREDDIT:
      return action.subreddit
    default:
      return state
  }
}

export default function posts(state: any = {
  isFetching: false,
  didInvalidate: false,
  items: []
}, action: any) {
  switch (action.type) {
    case INVALIDATE_SUBREDDIT:
      return Object.assign({}, state, {
        didInvalidate: true
      })
    case REQUEST_POSTS:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false
      })
    case RECEIVE_POSTS:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        items: action.posts,
        lastUpdated: action.receivedAt
      })
    default:
      return state
  }
}

export function postsBySubreddit(state: any = {}, action: any) {
  switch (action.type) {
    case INVALIDATE_SUBREDDIT:
    case RECEIVE_POSTS:
    case REQUEST_POSTS:
      return Object.assign({}, state, {
        [action.subreddit]: posts(state[action.subreddit], action)
      })
    default:
      return state
  }
}


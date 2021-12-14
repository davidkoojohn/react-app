export const REQUEST_POSTS = 'REQUEST_POSTS'
export const SELECT_SUBREDDIT = "SELECT_SUBREDDIT"
export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const INVALIDATE_SUBREDDIT = 'INVALIDATE_SUBREDDIT'

export function selectSubreddit(subreddit: string) {
  return {
    type: SELECT_SUBREDDIT,
    subreddit
  }
}

export function invalidateSubreddit(subreddit: string) {
  return {
    type: INVALIDATE_SUBREDDIT,
    subreddit
  }
}

function requestPosts(subreddit: string) {
  return {
    type: REQUEST_POSTS,
    subreddit
  }
}

function receivePosts(subreddit: string, json: any) {
  return {
    type: RECEIVE_POSTS,
    subreddit,
    posts: json.data.children.map((child: any) => child.data),
    receivedAt: Date.now()
  }
}

export function fetchPosts(subreddit: string) {
  return (dispatch: any) => {
    dispatch(requestPosts(subreddit))
    return fetch(`http://www.reddit.com/r/${subreddit}.json`)
      .then(response => response.json())
      .then(json => dispatch(receivePosts(subreddit, json)))
  }
}

export function shouldFetchPosts(state: any, subreddit: string) {
  const posts = state.postsBySubreddit[subreddit]
  if (!posts) {
    return true
  } else if (posts.isFetching) {
    return false
  } else {
    return posts.didInvalidate
  }
}

export function fetchPostsIfNeeded(subreddit: string) {
  return (dispatch: any, getState: any) => {
    if (shouldFetchPosts(getState(), subreddit)) {
      // 在 thunk 里 dispatch 另一个 thunk！
      return dispatch(fetchPosts(subreddit))
    } else {
      // 告诉调用代码不需要再等待。
      return Promise.resolve()
    }
  }
}


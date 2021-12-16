import { connect, ConnectedProps } from "react-redux"
import { fetchNewsIfNeeded, selectChannel, invalidateChannel } from "../../store/actions/news_actions";
import { RootState } from "../../store/reducers"

const channelConnector = connect(
  (state: RootState) => {
    const { selectedNewsChannel } = state
    const { channels = [], currentChannel } = selectedNewsChannel
    return {
      channels,
      currentChannel: currentChannel,
    }
  },
  (dispatch) => ({
    setNewsChannel: (channel: string) => dispatch(selectChannel(channel))
  })
)
type TChannelPropsFromRedux = ConnectedProps<typeof channelConnector>
type TChannelProps = TChannelPropsFromRedux & {
  // testField: string
}
const Channel = channelConnector((
  { channels, currentChannel, setNewsChannel }: TChannelProps
) => {
  return (
    <div className={"flex border py-2"}>
      {channels.map(item => (
        <button
          className={"px-2 hover:underline "+`${item.channel === currentChannel && "bg-red-500 text-white"}`}
          key={item.channel}
          onClick={() => {
            setNewsChannel(item.channel)
          }}
        >
          {item.title}
        </button>
      ))}
    </div>
  )
})

const newsListConnector = connect(
  (state: RootState) => {
    const { newsByList, selectedNewsChannel } = state
    const { currentChannel } = selectedNewsChannel
    const { items = [], isFetching = true, didInvalidate, lastUpdated } = newsByList[currentChannel] || {}
    return {
      list: items as any[],
      isFetching,
      didInvalidate,
      lastUpdated,
      channel: currentChannel
    }
  },
  dispatch => {
    return {
      dispatchNesList: (channel: string) => dispatch<any>(fetchNewsIfNeeded(channel)),
      invalidateNews: (channel: string) => dispatch<any>(invalidateChannel(channel))
    }
  }
)
type TNewsListPropsFromRedux = ConnectedProps<typeof newsListConnector>
type TNewsListProps = TNewsListPropsFromRedux & {
  // test: number
}
const NewsList = newsListConnector((
  { dispatchNesList, channel, list, isFetching, lastUpdated, invalidateNews }: TNewsListProps
) => {
  dispatchNesList(channel)

  const content = (
    <>
      <p>
        {lastUpdated && <span>Last updated at {new Date(lastUpdated).toLocaleTimeString()}.{' '}</span>}
        <br/>
        <button
          onClick={
            () => {
              invalidateNews(channel)
              dispatchNesList(channel)
            }
          }
        >
          Refresh
        </button>
      </p>
      {isFetching && list.length === 0 && <div>Loading...</div>}
      {!isFetching && list.length === 0 && <div>No Data!</div>}
      {list.length > 0 && (
        <ul className={`${isFetching && "opacity-50"}`}>
          {list.map((item, index) => (
            <li
              key={item.docid}
              className={"hover:underline"}
            >
              {index + 1}. {item.title}
            </li>
          ))}
        </ul>
      )}
    </>
  )

  return (
    <div>
      {content}
    </div>
  )
})

const NewsApp = () => {
  return (
    <>
      <h1 className={"text-2xl py-2"}>News App</h1>
      <Channel/>
      <NewsList/>
    </>
  )
}

export default NewsApp



import { connect } from "react-redux"
import { fetchNewsIfNeeded, selectChannel, invalidateChannel } from "../../store/actions/news_actions";
import { IChannel } from "../../store/types/news_types"
import { RootState } from "../../store/reducers"

interface IChannelProps {
  channels: IChannel[],
  currentChannel: string
  setNewsChannel: (channel: string) => void
}
const Channel = connect(
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
)(({ channels, currentChannel, setNewsChannel }: IChannelProps) => {
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


interface INewsListProps {
  dispatchNesList: (channel: string) => void
  invalidateNews: (channel: string) => void
  channel: string,
  list: any[]
  isFetching: boolean
  didInvalidate: boolean
  lastUpdated: number
}
const NewsList = connect(
  (state: RootState) => {
    const { newsByList, selectedNewsChannel } = state
    const { currentChannel } = selectedNewsChannel
    const { items = [], isFetching = true, didInvalidate, lastUpdated } = newsByList[currentChannel] || {}
    return {
      list: items,
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
)(({ dispatchNesList, channel, list, isFetching, lastUpdated, invalidateNews }: INewsListProps) => {

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



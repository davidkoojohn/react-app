import { useState } from "react"
import { connect, ConnectedProps } from "react-redux"
import * as sculptureActions from "../../store/actions/sculpture_actions"
import { RootState } from "../../store/reducers"

const connectGallery = connect(
  (state: RootState) => ({
    sculpture: state.sculptureReducer.current,
    sculptureList: state.sculptureReducer.list,
  }),
  (dispatch: any) => ({
    getCurrentSculpture: (index: number) => dispatch(sculptureActions.getCurrentSculpture(index))
  })
)

type TGalleryPropsFromRedux = ConnectedProps<typeof connectGallery>
type TGalleryProps = TGalleryPropsFromRedux & {
  //
}

const Gallery =  connectGallery(function Gallery({ sculpture, sculptureList, getCurrentSculpture }: TGalleryProps) {
  const [index, setIndex] = useState<number>(0)
  const [showMore, setShowMore] = useState<boolean>(false)

  return (
    <>
      <button onClick={
        () => {
          if (index >= sculptureList.length - 1) {
            setIndex(0)
            getCurrentSculpture(0)
          } else {
            setIndex(index + 1)
            getCurrentSculpture(index + 1)
          }
        }}
      >Next</button>
      <h2>
        <i>{sculpture.name} </i>
        by {sculpture.artist}
      </h2>
      <h3>
        ({index + 1} of {sculptureList.length})
      </h3>
      <button onClick={() => setShowMore(!showMore)}>
        {showMore ? 'Hide' : 'Show'} details
      </button>
      {showMore && <p>{sculpture.description}</p>}
    </>
  )
})

export default function Learn() {
  return (
    <>
      <Gallery/>
    </>
  )
}



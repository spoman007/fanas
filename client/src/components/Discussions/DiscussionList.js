import React from 'react'
import Discussion from './Discussion'
import { useData } from '../hooks/Hooks'
import Spinner from '../Spinner'

const DiscussionList = () => {
  const [loadingDiscussions, discussions] = useData(
    'https://fanas.herokuapp.com/discussions'
  )

  return !loadingDiscussions ? (
    <div className="container">
      {discussions.map((discussion, i) => (
        <Discussion discussion={discussion} key={discussion.title + i} />
      ))}
    </div>
  ) : (
    <Spinner />
  )
}

export default DiscussionList

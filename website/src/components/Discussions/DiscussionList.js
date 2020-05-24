import React, { useState, useEffect } from 'react'
import Discussion from './Discussion'

const DiscussionList = () => {
  const [discussions, setDiscussions] = useState([])

  useEffect(() => {
    fetch('https://scraper-apisz.herokuapp.com/discussions')
      .then((res) => res.json())
      .then((discussions) => setDiscussions(discussions))
  }, [])
  return (
    <div className="container">
      {discussions.map((discussion, i) => (
        <Discussion discussion={discussion} key={discussion.title + i} />
      ))}
    </div>
  )
}

export default DiscussionList

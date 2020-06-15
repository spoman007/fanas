import React from 'react'
import Discussion from './Discussion'
import Spinner from '../Spinner'
import { motion } from 'framer-motion'
import { useQuery } from 'react-query'

const DiscussionList = ({ isOpen, language, handleDrag }) => {
  const fetchDiscussions = () =>
  fetch(`https://fanas.herokuapp.com/discussions/${language}`).then((res) =>
    res.json()
  )

const { status, data: discussions, error } = useQuery(
  `discussions${language}`,
  fetchDiscussions
)

if (status === 'loading') {
  return <Spinner />
}

if (status === 'error') {
  return <span>Error: {error.message}</span>
}

  return (
    <motion.div
    //   drag="x"
    //   dragConstraints={{ left: 0, right: 0 }}
    //   onDragEnd={(_event, info) => handleDrag(info.point.x)}
      className="container"
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0 },
      }}
      transition={{ duration: 0.2 }}
      style={{ backgroundColor: isOpen ? '#848484' : null }}
    >
      {discussions.map((discussion, i) => (
        <Discussion discussion={discussion} key={discussion.title + i} />
      ))}
    </motion.div>
  )
}

export default DiscussionList

import React from 'react'
import Discussion from './Discussion'
import { useData } from '../../hooks/Hooks'
import Spinner from '../Spinner'
import { motion } from 'framer-motion'

const DiscussionList = () => {
  const [loadingDiscussions, discussions] = useData(
    'https://fanas.herokuapp.com/discussions'
  )

  return !loadingDiscussions ? (
    <motion.div
      className="container"
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0 },
      }}
      transition={{ duration: 0.2 }}
    >
      {discussions.map((discussion, i) => (
        <Discussion discussion={discussion} key={discussion.title + i} />
      ))}
    </motion.div>
  ) : (
    <Spinner />
  )
}

export default DiscussionList

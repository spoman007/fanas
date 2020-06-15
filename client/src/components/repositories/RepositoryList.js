import React from 'react'
import Repository from './Repository'
import Spinner from '../Spinner'
import { useData } from '../../hooks/Hooks'
import { motion } from 'framer-motion'

const RepositoryList = ({ isOpen, language, handleDrag }) => {
  const [loadingRepositories, repos] = useData(
    `https://fanas.herokuapp.com/repositories/${language}`
  )

  return !loadingRepositories ? (
    <motion.div
      // drag
      // dragConstraints={{ left: 0, right: 0 }}
      // onDragEnd={
      //   (_event, info) => handleDrag(info.point.x)
      // }
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
      {repos.map((repo) => (
        <Repository repo={repo} key={repo.title} />
      ))}
    </motion.div>
  ) : (
    <Spinner />
  )
}

export default RepositoryList

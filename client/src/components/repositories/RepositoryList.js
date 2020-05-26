import React from 'react'
import Repository from './Repository'
import Spinner from '../Spinner'
import { useData } from '../../hooks/Hooks'
import { motion } from 'framer-motion'

const RepositoryList = () => {
  const [loadingRepositories, repos] = useData(
    'https://fanas.herokuapp.com/repositories'
  )

  return !loadingRepositories ? (
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
      {repos.map((repo) => (
        <Repository repo={repo} key={repo.title} />
      ))}
    </motion.div>
  ) : (
    <Spinner />
  )
}

export default RepositoryList

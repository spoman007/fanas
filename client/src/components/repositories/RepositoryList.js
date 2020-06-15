import React from 'react'
import Repository from './Repository'
import Spinner from '../Spinner'
import { motion } from 'framer-motion'
import { useQuery } from 'react-query'

const RepositoryList = ({ isOpen, language, handleDrag }) => {
  const fetchRepos = () =>
    fetch(`https://fanas.herokuapp.com/repositories/${language}`).then((res) =>
      res.json()
    )

  const { status, data: repos, error } = useQuery(
    `repository${language}`,
    fetchRepos
  )

  if (status === 'loading') {
    return <Spinner />
  }

  if (status === 'error') {
    return <span>Error: {error.message}</span>
  }

  return (
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
  )
}

export default RepositoryList

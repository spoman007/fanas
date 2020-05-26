import React from 'react'
import Repository from './Repository'
import Spinner from '../Spinner'
import { useData } from '../hooks/Hooks'

const RepositoryList = () => {
  const [loadingRepositories, repos] = useData(
    'https://fanas.herokuapp.com/repositories'
  )

  return !loadingRepositories ? (
    <div className="container">
      {repos.map((repo) => (
        <Repository repo={repo} key={repo.title} />
      ))}
    </div>
  ) : (
    <Spinner />
  )
}

export default RepositoryList

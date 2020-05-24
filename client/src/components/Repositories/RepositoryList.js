import React, { useState, useEffect } from 'react'
import Repository from './Repository'

const RepositoryList = () => {
  const [repos, setRepos] = useState([])

  useEffect(() => {
    fetch('https://fanas.herokuapp.com/repositories')
      .then((res) => res.json())
      .then((repos) => setRepos(repos))
  }, [])

  return (
    <div className="container">
      {repos.map((repo) => (
        <Repository repo={repo} key={repo.title} />
      ))}
    </div>
  )
}

export default RepositoryList

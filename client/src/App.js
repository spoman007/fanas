import React, { useState } from 'react'
import './App.css'
import RepositoryList from './components/repositories/RepositoryList'
import Nav from './components/navigation/Nav'
import ArticleList from './components/articles/ArticleList'
import DiscussionList from './components/discussions/DiscussionList'

const App = () => {
  const [currentTab, setCurrentTab] = useState('repositories')
  return (
    <>
      {currentTab === 'repositories' && <RepositoryList />}
      {currentTab === 'articles' && <ArticleList />}
      {currentTab === 'discussions' && <DiscussionList />}
      <Nav setCurrentTab={setCurrentTab} currentTab={currentTab} />
    </>
  )
}

export default App

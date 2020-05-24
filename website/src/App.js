import React, { useState } from 'react'
import './App.css'
import RepositoryList from './components/Repositories/RepositoryList'
import Nav from './components/Navigation/Nav'
import ArticleList from './components/Articles/ArticleList'
import DiscussionList from './components/Discussions/DiscussionList'

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

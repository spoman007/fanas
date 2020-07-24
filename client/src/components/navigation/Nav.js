import React from 'react'

import {
  RiGitRepositoryLine,
  RiNewspaperLine,
  RiDiscussLine,
  RiMenuLine,
} from 'react-icons/ri'

const Nav = ({ setCurrentTab, currentTab, toggle }) => (
  <div className="nav">
    <a
      href="/#"
      className={`nav-link ${
        currentTab === 'repositories' ? ', nav-link--active' : ''
        }`}
      onClick={() => setCurrentTab('repositories')}
    >
      <RiGitRepositoryLine className="nav-icon" />
      <span className="nav-text">Repos</span>
    </a>
    <a
      href="/#"
      className={`nav-link ${
        currentTab === 'articles' ? ', nav-link--active' : ''
        }`}
      onClick={() => setCurrentTab('articles')}
    >
      <RiNewspaperLine className="nav-icon" />
      <span className="nav-text">Articles</span>
    </a>
    <a
      href="/#"
      className={`nav-link ${
        currentTab === 'discussions' ? ', nav-link--active' : ''
        }`}
      onClick={() => setCurrentTab('discussions')}
    >
      <RiDiscussLine className="nav-icon" />
      <span className="nav-text">Discuss</span>
    </a>
    <a href="/#" className="nav-link" onClick={() => toggle()}>
      <RiMenuLine className="nav-icon" />
      <span className="nav-text">Menu</span>
    </a>
  </div>
)

export default Nav

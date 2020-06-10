import React, { useState } from 'react'
import './App.css'
import RepositoryList from './components/repositories/RepositoryList'
import Nav from './components/navigation/Nav'
import ArticleList from './components/articles/ArticleList'
import DiscussionList from './components/discussions/DiscussionList'
import { useRef } from 'react'
import { motion, useCycle } from 'framer-motion'
import { useDimensions } from './use-dimensions'
import { Navigation } from './Navigation'

const sidebar = {
    open: (height = 1000) => ({
      clipPath: `circle(${height * 2 + 200}px at 80% 100%)`,
      transition: {
        type: 'spring',
        stiffness: 20,
        restDelta: 2,
      },
      display: 'block',
    }),
    closed: {
      clipPath: 'circle(30px at 80% 100%)',
      transition: {
        delay: 0.5,
        type: 'spring',
        stiffness: 400,
        damping: 40,
      },
      display: 'none',
    },
  },
  navItem = {
    open: {
      transition: {
        delay: 0.3,
      },
      height: '100vh',
    },
    closed: {
      transition: {
        delay: 0.3,
      },
      height: 0,
    },
  }

const App = () => {
  const [currentTab, setCurrentTab] = useState('repositories')
  const [language, setLanguage] = useState('javascript')
  const [isOpen, toggleOpen] = useCycle(false, true)
  const containerRef = useRef(null)
  const { height } = useDimensions(containerRef)
  const setNewLanguage = (e, language) => {
    e.stopPropagation()
    setLanguage(language)
    toggleOpen(false)
  }
  isOpen
    ? (document.body.style.overflow = 'hidden')
    : (document.body.style.overflow = 'inherit')
  return (
    <>
      <motion.nav
        initial={false}
        animate={isOpen ? 'open' : 'closed'}
        custom={height}
        ref={containerRef}
        variants={navItem}
        onClick={() => toggleOpen(false)}
      >
        <motion.div
          className="background"
          variants={sidebar}
          onClick={(e) => e.stopPropagation()}
        />
        <Navigation setLanguage={setNewLanguage} />
      </motion.nav>

      {currentTab === 'repositories' && (
        <RepositoryList isOpen={isOpen} language={language} />
      )}
      {currentTab === 'articles' && (
        <ArticleList isOpen={isOpen} language={language} />
      )}
      {currentTab === 'discussions' && (
        <DiscussionList isOpen={isOpen} language={language} />
      )}
      <Nav
        setCurrentTab={setCurrentTab}
        currentTab={currentTab}
        toggle={() => toggleOpen()}
      />
    </>
  )
}

export default App

import React from 'react'
import Article from './Article'
import { useData } from '../../hooks/Hooks'
import Spinner from '../Spinner'
import { motion } from 'framer-motion'

const ArticleList = ({isOpen, language}) => {
  const [loadingArticles, articles] = useData(
    `https://fanas.herokuapp.com/articles/${language}`
  )
  return !loadingArticles ? (
    <motion.div
      className="container"
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0 },
      }}
      transition={{ duration: 0.2 }}
      style={{ backgroundColor: isOpen ? '#848484' : null }}
    >
      {articles.map((article) => (
        <Article article={article} key={article.title} />
      ))}
    </motion.div>
  ) : (
    <Spinner />
  )
}

export default ArticleList

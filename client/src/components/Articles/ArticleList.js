import React from 'react'
import Article from './Article'
import { useData } from '../../hooks/Hooks'
import Spinner from '../Spinner'
import { motion } from 'framer-motion'

const ArticleList = () => {
  const [loadingArticles, articles] = useData(
    'https://fanas.herokuapp.com/articles'
  )
  return !loadingArticles ? (
    <motion.div
      className="container"
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
      }}
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

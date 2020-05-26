import React from 'react'
import Article from './Article'
import { useData } from '../../hooks/Hooks'
import Spinner from '../Spinner'

const ArticleList = () => {
  const [loadingArticles, articles] = useData(
    'https://fanas.herokuapp.com/articles'
  )
  return !loadingArticles ? (
    <div className="container">
      {articles.map((article) => (
        <Article article={article} key={article.title} />
      ))}
    </div>
  ) : (
    <Spinner />
  )
}

export default ArticleList

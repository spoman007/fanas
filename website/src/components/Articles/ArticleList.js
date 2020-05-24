import React, { useState, useEffect } from 'react'
import Article from './Article'

const ArticleList = () => {
  const [articles, setArticles] = useState([])

  useEffect(() => {
    fetch('https://scraper-apisz.herokuapp.com/articles')
      .then((res) => res.json())
      .then((articles) => setArticles(articles))
  }, [])
  return (
    <div className="container">
      {articles.map((article) => (
        <Article article={article} key={article.title} />
      ))}
    </div>
  )
}

export default ArticleList

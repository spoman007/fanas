import React from 'react'

const Article = ({ article: { title, link, image, tags } }) => (
  <div className="article card">
    <div onClick={() => window.open(link, '_newtab')}>
      <span className="article-title">{title}</span>
      <p>
        <span className="repo-stats">
          {tags.map(({ name }) => (
            <span key={name}>{`#${name} `}</span>
          ))}
        </span>
      </p>
    </div>
    {image && <img alt={title} className="article-image" src={image}></img>}
  </div>
)

export default Article

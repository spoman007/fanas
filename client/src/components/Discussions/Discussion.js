import React from 'react'

const Discussion = ({ discussion: { title, link, image, url } }) => (
  <div className="article card">
    <div>
      <span className="article-title" onClick={() => window.open(link, '_newtab')}>{title}</span>
      {url !== '' && url !== null && (
        <p>
          <a className="discussion-external-link" target="blank" href={url}>{`${url.slice(0, 20)}...`}</a>
        </p>
      )}
    </div>
    {image && <img alt={title} className="discussion-image" src={image}></img>}
  </div>
)

export default Discussion

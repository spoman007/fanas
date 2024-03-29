import React from 'react'
import { RiBookmark3Line } from "react-icons/ri";

const Repository = ({ bookmark,
  repo: { title, link, description, language, stars, colour, isFavorite },
}) => (
    <div className="card">
      <div onClick={() => window.open(link, '_newtab')}>
        <span>{title.substr(0, 40)}</span>
        <p>{description}</p>
        <p>
          <span className="repo-stats">
            <span
              className="repo-language-color"
              style={{
                backgroundColor: colour,
              }}
            ></span>
            <span>{language}</span>
          </span>
          <svg
            height="16"
            className="octicon octicon-star"
            aria-label="star"
            viewBox="0 0 14 16"
            version="1.1"
            width="14"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M14 6l-4.9-.64L7 1 4.9 5.36 0 6l3.6 3.26L2.67 14 7 11.67 11.33 14l-.93-4.74L14 6z"
            ></path>
          </svg>
          {stars}
        </p>
      </div>
      <div onClick={() => bookmark(title)} style={{ marginRight: 10 }}>
        <RiBookmark3Line className="nav-icon" style={{ color: isFavorite ? 'green' : 'white' }} />
      </div>
    </div>
  )

export default Repository

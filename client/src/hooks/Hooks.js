import { useState, useEffect } from 'react'

export const useData = (url) => {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState([])

  useEffect(() => {
    setLoading(true)
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setData(data)
        setLoading(false)
      })
  }, [url])

  return [loading, data]
}

import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import scrapeIt from 'scrape-it'

const app = express()

app.use(cors())

const port = process.env.PORT || 3000

app.get('/', async (req, res) => {
  const { data, response } = await scrapeIt(
    'https://github.com/trending?spoken_language_code=en',
    {
      repositories: {
        listItem: 'article',
        data: {
          title: {
            selector: 'h1',
            convert: (x) => x.split('\n').join('').replace(/\s/g, ''),
          },
          link: {
            selector: 'a',
            attr: 'href',
            convert: (x) =>
              'https://github.com' + x.split('=')[1].split('%2F').join('/'),
          },
          description: 'p.pr-4',
        },
      },
    }
  )

  res.send(data)
})

app.listen(port, () => console.log(`Listening on port ${port}`))

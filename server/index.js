import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import scrapeIt from 'scrape-it'
import fetch from 'node-fetch'
import expressPlayground from 'graphql-playground-middleware-express'
import { ApolloServer, gql } from 'apollo-server-express'

const app = express()

app.use(cors())

const port = process.env.PORT || 3000

const typeDefs = gql`
  type Tags {
    name: String
    keywords_for_search: String
  }

  type Article {
    title: String
    link: String
    tags: [Tags]
    image: String
  }

  type Repository {
    title: String
    link: String
    description: String
    language: String
    stars: String
    today: Int
    colour: String
  }

  type Discussion {
    title: String
    link: String
    url: String
    image: String
  }

  type Query {
    articles: [Article]
    repositories(language: String): [Repository]
    discussions: [Discussion]
  }
  schema {
    query: Query
  }
`
const resolvers = {
  Query: {
    articles: () => getArticles(),
    repositories: (parent, args) => getRepositories(args),
    discussions: () => getDiscussions(),
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
  playground: true,
})
server.applyMiddleware({ app })
app.get('/playground', expressPlayground({ endpoint: '/graphql' }))

app.get('/repositories/:language?', async (req, res) =>
  res.send(await getRepositories(req.params))
)

app.get('/articles', async (req, res) => res.json(await getArticles()))

app.get('/discussions', async (req, res) => res.json(await getDiscussions()))

app.listen(port, () => console.log(`Listening on port ${port}`))

async function getArticles() {
  const api_res = await fetch(
    'https://dev.to/search/feed_content?per_page=30&page=0&tag=javascript&sort_by=hotness_score&sort_direction=desc&tag_names%5B%5D=javascript&approved=&class_name=Article'
  )
  const { result } = await api_res.json()
  return result.map(({ path, tags, title, main_image, image_url }) => ({
    title,
    link: 'https://dev.to' + path,
    tags,
    image: main_image !== null ? main_image : image_url,
  }))
}

async function getRepositories({ language }) {
  const repoStructure = {
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
        language: {
          selector: '.mt-2',
          convert: (x) => x.split('\n')[0],
        },
        stars: {
          selector: '.mt-2 a',
          convert: (x) => x.split('\n').join('').split(' ')[0],
        },
        colour: {
          selector: '.mt-2 span .repo-language-color',
          attr: 'style',
          convert: (x) => x.split('background-color: ')[1],
        },
        today: {
          selector: '.float-sm-right',
          convert: (x) => parseInt(x.split('')[0]),
        },
        description: 'p.pr-4',
      },
    },
  }
  const obj =
      language === undefined || language === 'javascript'
        ? [
            scrapeIt(
              'https://github.com/trending/typescript?spoken_language_code=en',
              repoStructure
            ),
            scrapeIt(
              'https://github.com/trending/javascript?spoken_language_code=en',
              repoStructure
            ),
          ]
        : [
            scrapeIt(
              `https://github.com/trending/${language}?spoken_language_code=en`,
              repoStructure
            ),
          ],
    [
      {
        data: { repositories: tsRepos },
      },
      { data: { repositories: jsRepos = [] } = {} } = {},
    ] = await Promise.all(obj)

  return [...jsRepos, ...tsRepos].sort((a, b) => b.today - a.today)
}

async function getDiscussions() {
  const [
    {
      data: { children: reactThreads },
    },
    {
      data: { children: jsThreads },
    },
  ] = await Promise.all([
    fetch('https://www.reddit.com/r/reactjs/.json').then((value) =>
      value.json()
    ),
    fetch('https://www.reddit.com/r/javascript/.json').then((data) =>
      data.json()
    ),
  ])

  return [...reactThreads, ...jsThreads].map(
    ({ data: { title, permalink, url, thumbnail } }) => ({
      title: title,
      link: 'https://www.reddit.com' + permalink,
      url: url,
      image:
        thumbnail !== '' && thumbnail !== 'self' && thumbnail !== 'default'
          ? thumbnail
          : null,
    })
  )
}

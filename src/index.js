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
  }

  type Repository {
    title: String
    link: String
    description: String
  }

  type Query {
    articles: [Article]
    repositories: [Repository]
  }
  schema {
    query: Query
  }
`
const resolvers = {
  Query: {
    articles: () => getArticles(),
    repositories: () => getRepositories(),
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

app.get('/repositories', async (req, res) => res.send(await getRepositories()))

app.get('/articles', async (req, res) => res.json(await getArticles()))

app.listen(port, () => console.log(`Listening on port ${port}`))

async function getArticles() {
  const api_res = await fetch(
    'https://dev.to/search/feed_content?per_page=15&page=0&tag=javascript&sort_by=hotness_score&sort_direction=desc&tag_names%5B%5D=javascript&approved=&class_name=Article'
  )
  const { result } = await api_res.json()
  return result.map(({ path, tags, title }) => ({
    title,
    link: 'https://dev.to' + path,
    tags,
  }))
}

async function getRepositories() {
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
        description: 'p.pr-4',
      },
    },
  }

  const jsRepos = await scrapeIt(
    'https://github.com/trending/javascript?spoken_language_code=en',
    repoStructure
  )

  const tsRepos = await scrapeIt(
    'https://github.com/trending/typescript?spoken_language_code=en',
    repoStructure
  )

  return [...jsRepos.data.repositories, ...tsRepos.data.repositories].sort(
    (a, b) => Math.random() * 2 - 1
  )
}

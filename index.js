const express = require('express')
const { ApolloServer, gql } = require('apollo-server-express')
const schema = require('./schema')
const dataSources = require('./data-sources')


const app = express()

const server = new ApolloServer({
  schema,
  dataSources,
  context( { req } ){
   const token = req.headers['authorization']
   return{
    token
   } 
  }
})

// 当您将应用程序传递给applyMiddleware时，Apollo Server 会自动配置各种中间件（包括主体解析，GraphQL Playground前端和CORS支持），因此您不需要通过诸如app.use之类的机制来应用它们。
server.applyMiddleware({ app })


const PORT = process.env.PORT || 4000

app.listen({ port: PORT }, () =>
  console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`))

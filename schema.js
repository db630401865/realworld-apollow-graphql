const { makeExecutableSchema } = require('apollo-server-express')
const UpperCaseDirective = require('./schema-directives/upper')
const AuthDirective = require('./schema-directives/auth')
const typeDefs = require('./type-defs/index');
const userResolvers = require('./resolvers/user')
const articleResolvers = require('./resolvers/article')

const schema = makeExecutableSchema({
  typeDefs,
  resolvers:[userResolvers, articleResolvers],
  schemaDirectives:{
    upper: UpperCaseDirective,
    auth: AuthDirective
  }
})

module.exports = schema
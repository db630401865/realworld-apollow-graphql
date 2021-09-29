const { gql } = require('apollo-server-express');

 // 1. 定义 schema
 const typeDefs = gql`
  directive @upper on FIELD_DEFINITION # 在字段上使用
  directive @auth on FIELD_DEFINITION 

  type User {
    email: String!
    # username: String! @deprecated(reason: "请使用 newUsername")
    username: String!
    bio: String
    image: String
    token: String
  }

  type UserPayload {
    user: User
  }

  type Query{
    # foo:String @upper
    foo:String @auth
    currentUser: User @auth
    articles(offset: Int = 0, limit: Int = 2): ArticlesPayload
  }

  type ArticlesPayload {
    articles: [Article!]
    articlesCount: Int!
  } 


  input LoginInput {
    email: String!
    password: String!
  }

  input CreateUserInput {
    username: String!
    email: String!
    password: String!
  }

  input UpdateUserInput {
    username: String
    email: String
    password: String
    image: String
    bio: String
  }

  input CreateArticleInput {
    title: String!
    description: String!
    body: String!
    tagList: [String!]
  }

  type Article {
    _id: String!
    title: String!
    description: String!
    body: String!
    tagList: [String!]
    createdAt: String!
    updatedAt: String!
    favorited: Boolean
    favoritesCount: Int
    author: User
  }

  type CreateArticlePayload {
    article: Article
  }
 
  type Mutation {
    # User
    login(user: LoginInput): UserPayload
    createUser(user: CreateUserInput):UserPayload
    updateUser(user: UpdateUserInput):UserPayload @auth

    # Article
    createArticle(article: CreateArticleInput): CreateArticlePayload @auth
  }
`

module.exports = typeDefs
module.exports = {
  Query: {
    async articles (parent, { offset, limit }, { dataSources }) {
      return {}
      // const [ articles, articlesCount ] = await Promise.all([
      //   dataSources.articles.getArticles({
      //     offset,
      //     limit
      //   }),
      //   dataSources.articles.getCount()
      // ])
      // return {
      //   articles,
      //   articlesCount
      // }
    }
  },
  Mutation: {
   async createArticle(parent, { article }, { user, dataSources }){
    article.author = user._id
    const ret = await dataSources.articles.createArticle(article)
    // 根据 用户 ID 获取用户信息填充到 article.author 中
    return {
      article: ret
    }
   }
  },
  // 使用链式结构将用户信息储存
  Article:{
    async author (parent, args, { dataSources }) {
      const user = await dataSources.users.findById(parent.author)
      return user
    }
  },
  ArticlesPayload: {
    async articles (parent, { offset, limit }, { dataSources }) {
      const articles = await dataSources.articles.getArticles({
        offset,
        limit
      })
      return articles
    },
    async articlesCount (parent, args, { dataSources }) {
      const count = await dataSources.articles.getCount()
      return count
    }
  }
} 
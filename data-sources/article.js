const  { MongoDataSource } = require('apollo-datasource-mongodb')

class Article extends MongoDataSource {
  createArticle(data){
    const article = new this.model(data)
    // 直接使用数据库映射author数据
    // article.populate('author').execPopulate()
    return article.save()
  }

  getArticles(options){
    return this.model.find().skip(options.offset).limit(options.limit)
  }

  getCount(){
    return this.model.countDocuments()
  }
} 

module.exports = Article
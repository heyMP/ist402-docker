const fetch = require("node-fetch");
const NEWS_API_KEY =
  process.env.NEWS_API_KEY;
const redis = require('redis')
const redisClient = redis.createClient({ host: 'redis'})
const crypto = require('crypto')

module.exports = async (query) => {
  const { tag } = query
  const defaults = {
    // from: defaultFromDate(),
    sortBy: "publishedAt",
    apiKey: NEWS_API_KEY
  };
  let combinedQuery = { ...defaults, ...query }
  delete combinedQuery.tag
  combinedQuery = { tag, ...combinedQuery }
  let _query = Object.entries(combinedQuery).map(i => {
    if (i[0] === 'tag') {
      return i[1]
    }
    return `${i[0]}=${i[1]}`;
  })
  const _queryString = _query.join('&')

  let requestHash = crypto.createHash('md5').update(_queryString).digest("hex")

  // first check cache
  if (redisClient.get(requestHash)) {
    redisClient.get(requestHash, (err, data) => {
      if (err) throw err
      if (data !== null) {
        return data
      }
    })
  }
  const articles = await fetch(`https://newsapi.org/v2/everything?q=${_queryString}`)
    .then(res => {
      return res.json();
    })
    .then(res => res.articles);
  // save this request to cache
  redisClient.set(requestHash, JSON.stringify(articles), 'EX', 10)
  return articles
};

const defaultFromDate = () => {
  var today = new Date();
  var lastWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7);
  return lastWeek;
}
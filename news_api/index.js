require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { ApolloServer, gql } = require("apollo-server-express");
const newsClient = require("./news.js")

async function main() {
  const app = express();

  app.use(cors());
  app.use(bodyParser.json());

  const apolloServer = new ApolloServer({
    typeDefs: gql`
      type Query {
        news(tag: String, sortBy: String, from: String): [Article]
      }
      type Article {
        author: String
        title: String
        description: String
        url: String
        urlToImage: String
        publishedAt: String
        content: String
        source: Source
      }
      type Source {
        id: String
        name: String
      }
    `,
    resolvers: {
      Query: {
        news: async (parent, options) => await newsClient(options)
      }
    }
  });

  apolloServer.applyMiddleware({ app });

  app.listen(4000, () => {
    console.log(
      `🚀 Server ready at http://localhost:4000${apolloServer.graphqlPath}`
    );
  });
}

main()
  .catch(e => {
    console.error(e);
  })
  .finally(async () => {});
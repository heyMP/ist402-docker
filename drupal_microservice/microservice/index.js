require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { Photon } = require("@generated/photon");
const fetch = require("node-fetch");
const photon = new Photon();
const jwt = require("jsonwebtoken");
const { ApolloServer, gql } = require("apollo-server-express");
const cp = require("child_process");

const NEWS_API_KEY = process.env.NEWS_API_KEY || "ff07b06692c14cc3bf13ff2c0e350a7d";

async function main() {
  await photon.connect();
  const app = express();

  app.use(cors());
  app.use(bodyParser.json());

  const apolloServer = new ApolloServer({
    typeDefs: gql`
    `,
    resolvers: {
      Query: {
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
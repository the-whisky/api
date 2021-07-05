const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');

require('dotenv').config();
const db = require('./db');

const models = require('./models');

const port = process.env.PORT || 4000;
const DB_HOST = process.env.DB_HOST;

const typeDefs = require('./schema');
const resolvers = require('./resolvers');

const app = express();
db.connect(DB_HOST);

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: () => {
    return { models };
  },
});
server.applyMiddleware({ app, path: '/api' });

app.listen(port, () => {
  console.log(`server running! at http://localhost:${port}${server.graphqlPath}`);
});

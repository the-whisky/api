const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');

require('dotenv').config();
const db = require('./db');

const jwt = require('jsonwebtoken');
const models = require('./models');

const port = process.env.PORT || 4000;
const DB_HOST = process.env.DB_HOST;

const typeDefs = require('./schema');
const resolvers = require('./resolvers');

const app = express();
db.connect(DB_HOST);

const getUser = token => {
  if (token) {
    try {
      return jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      throw new Error('Sessoin invalid');
    }
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    const token = req.headers.authorization;
    const user = getUser(token);
    console.log(user);
    return { models, user };
  },
});
server.applyMiddleware({ app, path: '/api' });

app.listen(port, () => {
  console.log(`server running! at http://localhost:${port}${server.graphqlPath}`);
});

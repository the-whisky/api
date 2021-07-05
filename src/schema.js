const { gql } = require('apollo-server-express');

const typeDefs = gql`

scalar DateTime

type Whisky {
  id: ID!
  name: String! # 제품명
  country: String! # 생산지 국가
  alcohol: Float! # 알코올 도수 (%)
  volume: Int! # 용량 (ml)
  price: Int! # 가격 (원)
  createdAt: DateTime!
  updatedAt: DateTime!
}

type Query {
  whiskies: [Whisky!]!
  whisky(id: ID!): Whisky
}

type Mutation {
  newWhisky(
    name: String!
    country: String!
    alcohol: Float!
    volume: Int!
    price: Int!
  ): Whisky
  updateWhisky(
    id: ID!
    name: String!
    country: String!
    alcohol: Float!
    volume: Int!
    price: Int!
  ): Whisky
  deleteWhisky(
    id: ID!
  ): Boolean!
}
`;

module.exports = typeDefs;

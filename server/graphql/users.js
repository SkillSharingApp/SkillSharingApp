const { gql } = require('apollo-server-express');
const db = require('../database');

const typeDefs = gql`
    extend type Query {
        users: [User]
        user(id: ID!): User
    }
    type User {
        id: ID!
        name: String!
        username: String!
        email: String!
        password: String!
        creditBalance: Int
    }
`;

const resolvers = {
    Query: {
        users: async () => db.users.findAll(),
        user: async (obj, args, context, info) => db.users.findByPk(args.id),
    },
};

module.exports = { typeDefs, resolvers };
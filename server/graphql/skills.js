const { gql } = require('apollo-server-express');
const db = require('../database');

const typeDefs = gql`
    extend type Query {
        skills: [Skill]
        skill(id: ID!): Skill
    }
    type Skill {
        id: ID!
        teacherId: ID!
        name: String!
        description: String
        availability: String
        duration: Int
        overallRating: 
    }
`;

const resolvers = {

};

module.exports = { typeDefs, resolvers };
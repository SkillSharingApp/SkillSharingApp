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
        creditBalance: Int!
        skills: [Skill]
        messages: [Message]
        conversationWith(partnerId: ID!): [Message]
        classes: [Class]
    }
`;

const resolvers = {
    Query: {
        users: async () => db.users.findAll(),
        user: async (obj, args, context, info) => db.users.findByPk(args.id),
    },
    User: {
        skills: async (obj, args) => db.skills.findAll(),//filter by skill.teacherId === obj.Id
        messages: async (obj) => db.messages.findAll(), // filter by message.senderId === obj.Id
        conversationWith: async (obj, args) => db.messages.findAll(), // filter by (message.senderId === args.partnerId 
                                                                        //     && message.recipientId === user.id) 
                                                                        // || (message.senderId === user.id 
                                                                        //      && message.recipientId === args.partnerId);
        classes: async (obj) => db.classes.findAll() // filter by class.learner === obj.id
    }
};

module.exports = { typeDefs, resolvers };
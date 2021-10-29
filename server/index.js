const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { 
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLList,
    GraphQLNonNull,
    GraphQLInt
} = require('graphql');
//const { users, skills } = require('./fakeData');
const app = express();



const users = [
    { id: 1, name: 'Fred' },
    { id: 2, name: 'Jeorge' }
];

const skills = [
    { id: 1, userId: 1, name: 'Hot Air Ballooning' },
    { id: 2, userId: 1, name: 'Woodworking'},
    { id: 3, userId: 2, name: 'Pestering Sam' }
]



const UserType = new GraphQLObjectType({
    name: 'User',
    description: 'This represents a sigle user',
    fields: () => ({
        id: { type: GraphQLNonNull(GraphQLInt) },
        name: { type: GraphQLNonNull(GraphQLString) },
        skills: {
            type: new GraphQLList(SkillType),
            resolve: (user) => {
                return skills.filter(skill => skill.userId === user.id)
            }
        }
    })
});

const SkillType = new GraphQLObjectType({
    name: 'Skill',
    description: 'This represents a single skill of a single user',
    fields: () => ({
        id: { type: GraphQLNonNull(GraphQLInt) },
        userId: { type: GraphQLNonNull(GraphQLInt) },
        name: { type: GraphQLNonNull(GraphQLString) },
        userName: {
            type: GraphQLString,
            resolve: (skill) => {
                return users.find(user => users.id === skill.userId).name;
            }
        }
    })
})

const RootQueryType = new GraphQLObjectType({
    name: 'Query',
    description: 'Root Query',
    fields: () => ({
        users: {
            type: new GraphQLList(UserType),
            description: 'A list of all users',
            resolve: () => users
        },
        skills: {
            type: new GraphQLList(SkillType),
            description: 'A list of all skills of all users',
            resolve: () => skills
        }
    })
});

const RootMutationType = new GraphQLObjectType({
    name: 'Mutation',
    description: 'Root Mutation',
    fields: () => ({
        addUser: {
            type: UserType,
            description: '',
            args: {
                name: { type: GraphQLNonNull(GraphQLString) }
            },
            resolve: (parent, args) => {
                const user = { id: users.length + 1, name: args.name };
                users.push(user);
                return user;
            }
        }
    })
});

const schema = new GraphQLSchema({
    query: RootQueryType,
    mutation: RootMutationType
});

app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: true
}));



app.listen(3000, () => console.log('Server running on port 3000....'));
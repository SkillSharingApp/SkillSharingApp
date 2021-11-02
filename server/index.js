const express = require('express');
const  {graphqlHTTP} = require('express-graphql');
const  {GraphQLSchema} = require('graphql');
const { ApolloServer } = require('apollo-server-express');
// const { typeDefs } = require("./schema/type-defs");
// const { resolvers } = require("./schema/resolvers");

const { RootQueryType, RootMutationType } = require('./graphQLSchema');

const app = express();

//const server = new ApolloServer({typeDefs, resolvers})

//server.applyMiddleware({ app });

app.listen(3000, () => console.log('Server running on port 3000....'));
// const launchServer = async () => {
    
//     const server = new ApolloServer({
//         modules: [require('./graphql/users')]
//     });

//     await server.start();
//     server.applyMiddleware({ app });
// }

//launchServer();

const schema = new GraphQLSchema({
    query: RootQueryType,
    mutation: RootMutationType
});


app.use('/graphql', graphqlHTTP({
        schema: schema,
        graphiql: true
    }));
    
    
    


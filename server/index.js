const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { GraphQLSchema } = require('graphql');
const { ApolloServer } = require('apollo-server-express');

//const { RootQueryType, RootMutationType } = require('./graphQLSchema');

const app = express();


const launchServer = async () => {
    
    const server = new ApolloServer({
        modules: [require('./graphql/users')]
    });

    await server.start();
    server.applyMiddleware({ app });
}

launchServer();

// const schema = new GraphQLSchema({
//     query: RootQueryType,
//     mutation: RootMutationType
// });


// app.use('/graphql', graphqlHTTP({
    //     schema: schema,
    //     graphiql: true
    // }));
    
    
    
app.listen(3000, () => console.log('Server running on port 3000....'));

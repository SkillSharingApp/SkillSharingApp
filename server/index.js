const express = require('express');
const  {graphqlHTTP} = require('express-graphql');
const  {GraphQLSchema} = require('graphql');

const { RootQueryType, RootMutationType } = require('./graphQLSchema');

const app = express();

<<<<<<< HEAD
app.listen(3000, () => console.log('Server running on port 3000....'));
=======
//const server = new ApolloServer({typeDefs, resolvers})

//server.applyMiddleware({ app });


// const launchServer = async () => {
    
//     const server = new ApolloServer({
//         modules: [require('./graphql/users')]
//     });

//     await server.start();
//     server.applyMiddleware({ app });
// }

//launchServer();
>>>>>>> 69b40fe1e82d3f5c9f3db0ace7045163547a912f

const schema = new GraphQLSchema({
    query: RootQueryType,
    mutation: RootMutationType
});


app.use('/graphql', graphqlHTTP({
        schema: schema,
        graphiql: true
<<<<<<< HEAD
        }));
=======
    })
);
>>>>>>> 69b40fe1e82d3f5c9f3db0ace7045163547a912f
    
    
    
app.listen(3000, () => console.log('Server running on port 3000....'));

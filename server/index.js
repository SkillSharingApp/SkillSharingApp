const express = require('express');
const  {graphqlHTTP} = require('express-graphql');
const  {GraphQLSchema} = require('graphql');

const { RootQueryType, RootMutationType } = require('./graphQLSchema');

const app = express();

app.listen(3000, () => console.log('Server running on port 3000....'));

const schema = new GraphQLSchema({
    query: RootQueryType,
    mutation: RootMutationType
});


app.use('/graphql', graphqlHTTP({
        schema: schema,
        graphiql: true
        }));
    
    
    


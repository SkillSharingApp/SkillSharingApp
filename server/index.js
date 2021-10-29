const { tupleExpression } = require('@babel/types');
const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { 
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString
} = require('graphql');
const app = express();

const schema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'HelloWorld',
        fields: () => ({
            message: { 
                type: GraphQLString,
                resolve: () => 'Hello World'
            }
        })
    })
});


app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: true
}));



app.listen(3000, () => console.log('Server running on port 3000....'));
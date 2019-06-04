require('dotenv').config();
const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');

const app = express();

// Middlewares
app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));

// Server settings
app.listen(process.env.SERVER_PORT, process.env.SERVER_HOST, () => {
    console.log(`*server running on http://${process.env.SERVER_HOST}:${process.env.SERVER_PORT}`);
});
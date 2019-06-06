require('dotenv').config();
const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');

const app = express();

// DB connection
mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@stayyy-cluster-t76dg.mongodb.net/gql-book-app?retryWrites=true&w=majority`)
        .then(() => {
            console.log("*Connected to MongoDB Atlas.");
        })
        .catch((err) => {
            console.log(err);
        });

// Middlewares
app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));

// Server settings
app.listen(process.env.SERVER_PORT, process.env.SERVER_HOST, () => {
    console.log(`*server running on http://${process.env.SERVER_HOST}:${process.env.SERVER_PORT}`);
});
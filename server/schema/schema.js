const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLInt, GraphQLList } = graphql;
const _ = require('lodash');

// dummy data
let books = [
    { id: '1', name: 'Book 1', genre: 'Fantasy', authorId: '1' },
    { id: '2', name: 'Book 2', genre: 'Fantasy', authorId: '2' },
    { id: '3', name: 'Book 3', genre: 'Crime', authorId: '3' },
    { id: '4', name: 'Book 4', genre: 'Romance', authorId: '2' },
    { id: '5', name: 'Book 5', genre: 'Thriller', authorId: '3' },
    { id: '6', name: 'Book 6', genre: 'Crime', authorId: '3' }
]

let authors = [
    { id: '1', name: 'Sanjeev', age: 21 },
    { id: '2', name: 'Mansi', age: 23 },
    { id: '3', name: 'Vishakha', age: 22 }
]

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: {
            type: GraphQLID
        },
        name: {
            type: GraphQLString
        },
        genre: {
            type: GraphQLString
        },
        author: {
            type: AuthorType,
            resolve(parent, args) {
                return _.find(authors, {id: parent.authorId});
            }
        }    
    })
});

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: {
            type: GraphQLID
        },
        name: {
            type: GraphQLString
        },
        age: {
            type: GraphQLInt
        },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args) {
                return _.filter(books, {authorId: parent.id});
            }
        }    
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args: {
                id: {
                    type: GraphQLID
                }
            },
            resolve(parent, args) {
                // code to get data from db / other source
                return _.find(books, {id: args.id});
            }
        },
        author: {
            type: AuthorType,
            args: {
                id: {
                    type: GraphQLID
                }
            },
            resolve(parent, args) {
                return _.find(authors, {id: args.id});
            }
        },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args){
                return books;
            }
        },
        authors: {
            type: new GraphQLList(AuthorType),
            resolve(parent, args){
                return authors;
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
});
import React from 'react';

import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

import  BookList from './components/BookList';
import  AddBook from './components/AddBook';

// Apollo setup
const client = new ApolloClient({
  uri: 'http://localhost:5000/graphql'
});

function App() {
  return (
    <ApolloProvider client={ client }>
      <div>
        <h1>My Book List</h1>
        <BookList />
        <AddBook />  
      </div>
    </ApolloProvider>
  );
}

export default App;

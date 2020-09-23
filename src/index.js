import React from 'react';
import ReactDOM from 'react-dom';
import '../src/styles/index.css';
import App from '../src/components/App';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { createPersistedQueryLink } from 'apollo-link-persisted-queries';
import { createHttpLink } from 'apollo-link-http';
import { ApolloLink } from 'apollo-link';
import { setContext } from '@apollo/client/link/context';

const URI = 'https://api-site-development.aonewallet.com/graphql';

// const authLink = setContext((_, { headers }) => {
//   // get the authentication token from local storage if it exists
//   const token = localStorage.getItem('token');
//   // return the headers to the context so httpLink can read them
//   return {
//     headers: {
//       ...headers,
//       authorization: token ? `bearer ${token}` : '',
//     },
//   };
// });

const link = ApolloLink.from([
  setContext((_, { headers }) => {
    const token = localStorage.getItem('token');
    const adminCode = localStorage.getItem('adminCode');

    console.log('token here', token);
    // Call the next link in the middleware chain.
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : '',
        'Admin-Code': adminCode ? `${adminCode}` : '',
      },
    };
  }),
  createPersistedQueryLink({ useGETForHashedQueries: true }),
  createHttpLink({
    uri: URI,
  }),
]);

const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: URI,
  link,
});

//Apollo Client
ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
);

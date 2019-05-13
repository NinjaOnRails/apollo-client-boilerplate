import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { InMemoryCache } from 'apollo-cache-inmemory';
import App from './components/App';

const cache = new InMemoryCache({
  dataIdFromObject: object => object.id || null,
});

const client = new ApolloClient({
  uri: 'https://immense-brushlands-88768.herokuapp.com/',
  request: async operation => {
    const token = await localStorage.getItem('token');
    operation.setContext({
      headers: {
        Authorization: token || '',
      },
    });
  },
  onError: ({ graphQLErrors, networkError }) => {
    if (networkError) console.log(`[Network error]: ${networkError}`);

    if (graphQLErrors[0].message === 'Authentication required') {
      graphQLErrors[0] = null;
    } else {
      graphQLErrors.map(({ message, locations, path }) =>
        console.log(
          `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
        ),
      );
    }
  },
  cache,
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root'),
);

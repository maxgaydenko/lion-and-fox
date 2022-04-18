import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

const client = new ApolloClient({
    // uri: '//dev.taske.ru/api/graphql',
    // uri: '//keystone:3055/api/graphql',
    uri: process.env.BACKEND,
    cache: new InMemoryCache(),
    credentials: 'include',
    headers: {
      authorization: window.localStorage.getItem('a')??'',
    }
  });

ReactDOM.render(
 <React.StrictMode>
  {/* <Provider store={store}> */}
  <ApolloProvider client={client}>
   <App />
  </ApolloProvider>
  {/* </Provider> */}
 </React.StrictMode>,
 document.getElementById("root")
);
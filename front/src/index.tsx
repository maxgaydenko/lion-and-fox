import React from 'react';
import ReactDOM from 'react-dom';
// import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
// import reportWebVitals from './reportWebVitals';
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

const client = new ApolloClient({
    uri: '//dev.taske.ru/api/graphql',
    // uri: '//keystone:3055/api/graphql',
    cache: new InMemoryCache(),
    credentials: 'include',
    headers: {
      authorization: window.localStorage.getItem('a')??'', // 'Fe26.2**36758f923720122a9f504789bd28f028a5bede7d28f51e70380582e6054f362a*fQlljM28lQelSc237kQBBw*yQoFlYik2d6kbgWc__I4cfwccEiZKSXvTLg_WKf6Fzf2Hej5fKIxpUWFmqT-yMfVrddYhdtzUwO7ijJwgFxk7Q*1652858721176*bda05bd043da638c07ff64eaca52e2f02583fa5aef585e3201f06f628fcf45f3*iKPNtKfJ3e5TNLy13GeRgp1vZbNyFBE8174vqEBTCUY'
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
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();

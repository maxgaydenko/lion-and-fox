import React from "react";
import ReactDOM from "react-dom";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import AppLoader from "./components/App";

import "./scss/index.scss";

const backend = process.env.REACT_APP_BACKEND_URL;
if (process.env.NODE_ENV === "development") console.log("Backend url", backend);
console.log("App version:", process.env.REACT_APP_VERSION);

const client = new ApolloClient({
 // uri: '//dev.taske.ru/api/graphql',
 // uri: '//keystone:3055/api/graphql',
 uri: `${backend}/api/graphql`,
 cache: new InMemoryCache(),
 credentials: "include",
 headers: {
  authorization: window.localStorage.getItem("a") ?? "",
 },
});

ReactDOM.render(
 //  <React.StrictMode>
 //   <ApolloProvider client={client}>
 //    <AppLoader />
 //   </ApolloProvider>
 //  </React.StrictMode>,
 <ApolloProvider client={client}>
  <AppLoader />
 </ApolloProvider>,
 document.getElementById("root")
);

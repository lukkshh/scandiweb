import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

const Category = React.lazy(() => import("./pages/Category"));
const Home = React.lazy(() => import("./pages/Index"));
const PDP = React.lazy(() => import("./pages/PDP"));

import "./App.css";

const client = new ApolloClient({
  uri: "/api/",
  cache: new InMemoryCache(),
  credentials: "include",
});

class App extends React.Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/all" element={<Home />} />
            <Route path="/clothes" element={<Category />} />
            <Route path="/tech" element={<Category />} />
            <Route path="/clothes/:id" element={<PDP />} />
            <Route path="/tech/:id" element={<PDP />} />
          </Routes>
        </Router>
      </ApolloProvider>
    );
  }
}

export default App;

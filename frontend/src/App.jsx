import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

import Category from "./pages/Category";
import Home from "./pages/Index";
import PDP from "./pages/PDP";

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

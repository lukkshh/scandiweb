import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

import Header from "./components/Header";
import Home from "./pages/Index";
import PDP from "./pages/PDP";

import "./App.css";

const client = new ApolloClient({
  uri: "/api",
  cache: new InMemoryCache(),
});

class App extends React.Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/men" element={<Home />} />
            <Route path="/kids" element={<Home />} />
            <Route path="/p/:id" element={<PDP />} />
          </Routes>
        </Router>
      </ApolloProvider>
    );
  }
}

export default App;

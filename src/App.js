import React from "react";
import { ApolloProvider } from "react-apollo";
import ApolloClient, { InMemoryCache } from "apollo-boost";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Header from "./components/common/Header";
import Clients from "./components/ClientComponents/Clients";
import EditClient from "./components/ClientComponents/EditClient";
import NewClient from "./components/ClientComponents/NewClient";
import NewProduct from "./components/ProductComponents/NewProduct";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache({
    addTypename: false
  }),
  onError: ({ networkError, graphQLErrors }) => {
    console.log("graphQLErrors", graphQLErrors);
    console.log("networkErrors", networkError);
  }
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <React.Fragment>
          <Header />
          <div className="container">
            <Switch>
              <Route exact path="/" component={Clients} />
              <Route exact path="/client/edit/:id" component={EditClient} />
              <Route exact path="/client/new" component={NewClient} />
              <Route exact path="/product/new" component={NewProduct} />
            </Switch>
          </div>
        </React.Fragment>
      </Router>
    </ApolloProvider>
  );
}

export default App;

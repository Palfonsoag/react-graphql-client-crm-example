import React from "react";
import { ApolloProvider } from "react-apollo";
import ApolloClient, { InMemoryCache } from "apollo-boost";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Header from "./components/common/Header";
import Clients from "./components/Clients";
import EditClient from "./components/EditClient";
import NewClient from "./components/NewClient";

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
            </Switch>
          </div>
        </React.Fragment>
      </Router>
    </ApolloProvider>
  );
}

export default App;

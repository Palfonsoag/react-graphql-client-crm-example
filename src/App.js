import React from "react";
import { ApolloProvider } from "react-apollo";
import ApolloClient, { InMemoryCache } from "apollo-boost";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Header from "./components/common/Header";
import Clients from "./components/clientComponents/Clients";
import EditClient from "./components/clientComponents/EditClient";
import NewClient from "./components/clientComponents/NewClient";
import NewProduct from "./components/productComponents/NewProduct";
import Products from "./components/productComponents/Products";
import EditProduct from "./components/productComponents/EditProduct";
import NewOrder from "./components/orderComponents/NewOrder"




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
              <Route exact path="/client" component={Clients} />
              <Route exact path="/client/edit/:id" component={EditClient} />
              <Route exact path="/client/new" component={NewClient} />
              <Route exact path="/product" component={Products} />
              <Route exact path="/product/new" component={NewProduct} />
              <Route exact path="/product/edit/:id" component={EditProduct} />
              <Route exact path="/order/new/:id" component={NewOrder} />
            </Switch>
          </div>
        </React.Fragment>
      </Router>
    </ApolloProvider>
  );
}

export default App;

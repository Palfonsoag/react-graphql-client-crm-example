import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import Header from "./components/common/Header";
import Clients from "./components/clientComponents/Clients";
import EditClient from "./components/clientComponents/EditClient";
import NewClient from "./components/clientComponents/NewClient";
import NewProduct from "./components/productComponents/NewProduct";
import Products from "./components/productComponents/Products";
import EditProduct from "./components/productComponents/EditProduct";
import NewOrder from "./components/orderComponents/NewOrder";
import OrderByClient from "./components/orderComponents/OrderByClient";
import Panel from "./components/panel/Panel";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Session from "./components/Session";

const App = ({ refetch, session }) => {
  // console.log(session);

  const message = session.getLoggedUser ? (
    `Welcome: ${session.getLoggedUser.name}`
  ) : (
    <Redirect to="/login" />
  );
  return (
    <Router>
      <React.Fragment>
        <Header session={session} />

        <div className="container">
          <p className="text-right">{message}</p>
          <Switch>
            <Route
              exact
              path="/register"
              render={() => <Register session={session} />}
            />
            <Route
              exact
              path="/login"
              render={() => <Login refetch={refetch} />}
            />
            <Route
              exact
              path="/client"
              render={() => <Clients session={session} />}
            />
            <Route exact path="/client/edit/:id" component={EditClient} />
            <Route
              exact
              path="/client/new"
              render={() => <NewClient session={session} />}
            />
            <Route exact path="/product" component={Products} />
            <Route exact path="/product/new" component={NewProduct} />
            <Route exact path="/product/edit/:id" component={EditProduct} />
            <Route exact path="/order/new/:id" component={NewOrder} />
            <Route exact path="/order/:id" component={OrderByClient} />
            <Route exact path="/panel" component={Panel} />
          </Switch>
        </div>
      </React.Fragment>
    </Router>
  );
};

const RootSession = Session(App);

export { RootSession };

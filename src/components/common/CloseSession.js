import React from "react";
import { ApolloConsumer } from "react-apollo";
import { withRouter } from "react-router-dom";

const logOut = (client, history) => {
  localStorage.removeItem("token", "");

  client.resetStore();

  history.push("/login");
};

const CloseSession = ({ history }) => {
  return (
    <ApolloConsumer>
      {client => {
        return (
          <button
            type="button"
            className="btn bnt-block btn-light ml-md-2 mt-2 mt-md-0"
            onClick={() => logOut(client, history)}
          >
            Log Out
          </button>
        );
      }}
    </ApolloConsumer>
  );
};

export default withRouter(CloseSession);

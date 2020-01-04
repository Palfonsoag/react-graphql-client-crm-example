import React from "react";
import { Query } from "react-apollo";
import { GET_CURRENT_USER_QUERY } from "../queries";

const Session = Component => props => {
  return (
    <Query query={GET_CURRENT_USER_QUERY}>
      {({ loading, error, data, refetch }) => {
        if (loading) return null;
        if (error) return `Error ${error.message}`;
        return <Component {...props} refetch={refetch} session={data} />;
      }}
    </Query>
  );
};

export default Session;

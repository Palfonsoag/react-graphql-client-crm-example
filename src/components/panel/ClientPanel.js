import React from "react";
import { Query } from "react-apollo";
import { TOP_TEN_BUYERS } from "../../queries";
import Loader from "../common/Loader";

const ClientPanel = () => {
  return (
    <Query query={TOP_TEN_BUYERS}>
      {({ loading, error, data }) => {
        if (loading) return <Loader />;
        if (error) return `Error ${error.message}`;
        console.log(data);
        return <Loader />;
      }}
    </Query>
  );
};

export default ClientPanel;

import React, { Component } from "react";
import { Query } from "react-apollo";
import { GET_CLIENT_QUERY } from "../../queries";
import EditClientForm from "./EditClientForm";

export default class EditClient extends Component {
  render() {
    const { id } = this.props.match.params;
    return (
      <React.Fragment>
        <h2 className="text-center">Edit Client</h2>
        <div className="row justify-content-center">
          <Query query={GET_CLIENT_QUERY} variables={{ id }}>
            {({ loading, error, data, refetch }) => {
              if (loading) return "Loading...";
              if (error) return `Error! ${error.message}`;
              return (
                <EditClientForm client={data.getClient} refetch={refetch} />
              );
            }}
          </Query>
        </div>
      </React.Fragment>
    );
  }
}

import React, { Component } from "react";
import { Query, Mutation } from "react-apollo";
import { Link } from "react-router-dom";
import { GET_CLIENTS_QUERY } from "../queries";
import { DELETE_CLIENT_MUTATION } from "../mutations";
import Pagination from "./common/Pagination";
class Clients extends Component {
  state = {
    pagination: {
      offset: 0,
      page: 2
    }
  };

  render() {
    return (
      <Query query={GET_CLIENTS_QUERY} pollInterval={1000}>
        {({ loading, error, data, startPolling, stopPolling }) => {
          if (loading) return "Loading...";
          if (error) return `Error: ${error.message}`;
          return (
            <React.Fragment>
              <h2 className="text-center">Client's List</h2>
              <ul className="list-group mt-4">
                {data.getClients.map(client => (
                  <li key={client.id} className="list-group-item">
                    <div className="row justify-content-between align-items-center">
                      <div className="col-md-8 d-flex justify-content-between align-items-center">
                        {client.name} {client.lastName} - {client.company}
                      </div>
                      <div className="col-md-4 d-flex justify-content-end">
                        <Mutation mutation={DELETE_CLIENT_MUTATION}>
                          {eraseClient => (
                            <button
                              type="button"
                              className="btn btn-danger d-block d-md-inline-block mr-2"
                              onClick={() => {
                                if (
                                  window.confirm(
                                    "You want to delete this client?"
                                  )
                                ) {
                                  eraseClient({ variables: { id: client.id } });
                                }
                              }}
                            >
                              &times; Delete
                            </button>
                          )}
                        </Mutation>

                        <Link
                          to={`/client/edit/${client.id}`}
                          className="btn btn-success d-block d-md-inline-block"
                        >
                          Edit
                        </Link>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
              <Pagination current={this.state.pagination.page} />
            </React.Fragment>
          );
        }}
      </Query>
    );
  }
}

export default Clients;

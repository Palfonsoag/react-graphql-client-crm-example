import React, { Component } from "react";
import { Query } from "react-apollo";
import { GET_PRODUCTS_QUERY } from "../../queries";
import ClientInfo from "./ClientInfo";
import Loader from "../common/Loader";

class NewOrder extends Component {
  state = {};
  render() {
    const { id } = this.props.match.params;
    return (
      <React.Fragment>
        <h1 className="text-center mb-5">New Order</h1>
        <div className="row">
          <div className="col-md-3">
            <ClientInfo id={id} />
          </div>
          <div className="col-md-9">
            <Query query={GET_PRODUCTS_QUERY}>
              {({ loading, error, data }) => {
                if (loading) return <Loader />;
                if (error) return `Error ${error.message}`;
                console.log(data);
                return <Loader />;
              }}
            </Query>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default NewOrder;

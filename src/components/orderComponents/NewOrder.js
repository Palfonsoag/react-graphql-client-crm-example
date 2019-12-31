import React, { Component } from "react";
import ClientInfo from "./ClientInfo";

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
          <div className="col-md-9">Order</div>
        </div>
      </React.Fragment>
    );
  }
}

export default NewOrder;

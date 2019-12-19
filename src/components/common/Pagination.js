import React, { Component } from "react";

export default class Pagination extends Component {
  state = {};
  render() {
    const { current } = this.props;
    const prevButton =
      current > 1 ? (
        <button type="button" className="btn btn-success mr-2">
          &laquo; Previous
        </button>
      ) : (
        <React.Fragment />
      );
    return (
      <div className="mt-5 d-flex justify-content-center">{prevButton}</div>
    );
  }
}

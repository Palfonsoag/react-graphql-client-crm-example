import React, { Component } from "react";

export default class Pagination extends Component {
  state = {
    pager: {
      pages: Math.ceil(Number(this.props.totalClients) / this.props.limit)
    }
  };
  render() {
    const { current, nextPage, previousPage } = this.props;
    const { pager } = this.state;

    const prevButton =
      current > 1 ? (
        <button
          type="button"
          className="btn btn-success mr-2"
          onClick={previousPage}
        >
          &laquo; Previous
        </button>
      ) : (
        <React.Fragment />
      );
    const nextButton =
      current !== pager.pages ? (
        <button type="button" className="btn btn-success" onClick={nextPage}>
          Next &raquo;
        </button>
      ) : (
        <React.Fragment />
      );
    return (
      <div className="mt-5 d-flex justify-content-center">
        {prevButton}
        {nextButton}
      </div>
    );
  }
}

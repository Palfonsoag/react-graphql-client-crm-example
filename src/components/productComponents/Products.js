import React, { Component } from "react";
import { Query, Mutation } from "react-apollo";
import { Link } from "react-router-dom";
import { GET_PRODUCTS_QUERY } from "../../queries";
import { DELETE_PRODUCT_MUTATION } from "../../mutations";
import SuccessAlert from "../common/SuccessAlert";
import Pagination from "../common/Pagination";
import Loader from "../common/Loader";

class Products extends Component {
  state = {
    alert: { show: false, message: "" },
    pager: {
      offset: 0,
      current: 1
    },
    limit: 5
  };

  previousPage = () => {
    const { limit, pager } = this.state;
    this.setState({
      pager: {
        offset: pager.offset - limit,
        current: pager.current - 1
      }
    });
  };
  nextPage = () => {
    const { limit, pager } = this.state;
    this.setState({
      pager: {
        offset: pager.offset + limit,
        current: pager.current + 1
      }
    });
  };
  render() {
    const {
      alert: { show, message },
      pager: { offset, current },
      limit
    } = this.state;

    const displayAlert = show ? (
      <SuccessAlert message={message} />
    ) : (
      <React.Fragment />
    );

    return (
      <React.Fragment>
        <h1 className="text-center mb-5">Products</h1>
        {displayAlert}
        <Query
          query={GET_PRODUCTS_QUERY}
          pollInterval={1000}
          variables={{ limit, offset: offset }}
        >
          {({ loading, error, data, startPolling, stopPolling }) => {
            if (loading) return <Loader />;
            if (error) return `Error: ${error.message}`;
            return (
              <React.Fragment>
                <table className="table">
                  <thead>
                    <tr className="table-primary">
                      <th scope="col">Name</th>
                      <th scope="col">Price</th>
                      <th scope="col">Stock</th>
                      <th scope="col">Delete</th>
                      <th scope="col">Edit</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.getProducts.map(product => {
                      const { id, price, stock, name } = product;

                      return (
                        <tr key={id}>
                          <td>{name}</td>
                          <td>{price}</td>
                          <td>{stock}</td>
                          <td>
                            <Mutation
                              mutation={DELETE_PRODUCT_MUTATION}
                              onCompleted={data => {
                                this.setState(
                                  {
                                    alert: {
                                      show: true,
                                      message: data.deleteProduct
                                    }
                                  },
                                  () => {
                                    setTimeout(() => {
                                      this.setState({
                                        alert: { show: false, message: "" }
                                      });
                                    }, 4000);
                                  }
                                );
                              }}
                            >
                              {deleteClientMutation => {
                                return (
                                  <button
                                    onClick={() => {
                                      if (
                                        window.confirm(
                                          "Do you want to delete this product?"
                                        )
                                      ) {
                                        deleteClientMutation({
                                          variables: { id }
                                        });
                                      }
                                    }}
                                    type="button"
                                    className="btn btn-danger"
                                  >
                                    &times; Delete
                                  </button>
                                );
                              }}
                            </Mutation>
                          </td>
                          <td>
                            <Link
                              to={`/product/edit/${id}`}
                              className="btn btn-success"
                            >
                              Edit Product
                            </Link>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
                <Pagination
                  current={current}
                  totalItems={data.totalProducts}
                  limit={limit}
                  previousPage={this.previousPage}
                  nextPage={this.nextPage}
                />
              </React.Fragment>
            );
          }}
        </Query>
      </React.Fragment>
    );
  }
}

export default Products;

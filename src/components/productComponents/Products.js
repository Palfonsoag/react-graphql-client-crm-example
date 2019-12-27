import React, { Component } from "react";
import { Query, Mutation } from "react-apollo";
import { Link } from "react-router-dom";
import { GET_PRODUCTS_QUERY } from "../../queries";
import { DELETE_PRODUCT_MUTATION } from "../../mutations";

class Products extends Component {
  state = {};

  render() {
    return (
      <React.Fragment>
        <h1 className="text-center mb-5">Products</h1>
        <Query query={GET_PRODUCTS_QUERY} pollInterval={1000}>
          {({ loading, error, data, startPolling, stopPolling }) => {
            if (loading) return "Loading...";
            if (error) return `Error: ${error.message}`;
            console.log(data.getProducts);
            return (
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
                          <Mutation mutation={DELETE_PRODUCT_MUTATION}>
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
            );
          }}
        </Query>
      </React.Fragment>
    );
  }
}

export default Products;

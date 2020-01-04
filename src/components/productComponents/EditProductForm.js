import React, { Component } from "react";
import { Mutation } from "react-apollo";
import { withRouter } from "react-router-dom";
import { UPDATE_PRODUCT_MUTATION } from "../../mutations";

const initialState = {
  productName: "",
  price: "",
  stock: ""
};
class EditProductForm extends Component {
  state = {
    productName: this.props.product.name,
    price: this.props.product.price,
    stock: this.props.product.stock
  };

  updateState = e => {
    const { name, value } = e.target;
    if ((name === "price" || name === "stock") && value < 0) {
      this.setState({
        [name]: 0
      });
      return;
    }
    this.setState({
      [name]: value
    });
  };
  validateForm = () => {
    const { productName, price, stock } = this.state;

    const disabledButton = !productName || !price || !stock;

    return disabledButton;
  };

  clearState = () => {
    this.setState({ ...initialState });
  };

  handleEditProduct = (e, editProduct) => {
    e.preventDefault();

    editProduct()
      .then(data => {
        this.clearState();
      })
      .catch(err => {});
  };

  render() {
    const { productName, price, stock } = this.state;
    const { id } = this.props;
    const input = {
      id,
      name: productName,
      price: Number(price),
      stock: Number(stock)
    };

    return (
      <Mutation
        mutation={UPDATE_PRODUCT_MUTATION}
        variables={{ input }}
        key={id}
        onCompleted={() =>
          this.props.refetch().then(() => {
            this.props.history.push("/product");
          })
        }
      >
        {(editProduct, { loading, error, data }) => {
          return (
            <form
              className="col-md-8"
              onSubmit={e => this.handleEditProduct(e, editProduct)}
            >
              <div className="form-group">
                <label>Name:</label>
                <input
                  onChange={this.updateState}
                  type="text"
                  name="productName"
                  className="form-control"
                  placeholder="Product's name"
                  value={productName}
                />
              </div>
              <div className="form-group">
                <label>Price:</label>
                <div className="input-group">
                  <div className="input-group-prepend">
                    <div className="input-group-text">$</div>
                  </div>
                  <input
                    onChange={this.updateState}
                    type="number"
                    min="0"
                    name="price"
                    className="form-control"
                    placeholder="Product's Price"
                    value={price}
                  />
                </div>
              </div>
              <div className="form-group">
                <label>Stock:</label>
                <input
                  onChange={this.updateState}
                  type="number"
                  min="0"
                  name="stock"
                  className="form-control"
                  placeholder="stock"
                  value={stock}
                />
              </div>
              <button
                disabled={this.validateForm()}
                type="submit"
                className="btn btn-success float-right"
              >
                Save Changes
              </button>
            </form>
          );
        }}
      </Mutation>
    );
  }
}

export default withRouter(EditProductForm);

import React, { Component } from "react";
import { Mutation } from "react-apollo";
import { NEW_PRODUCT } from "../../mutations";

const initialState = {
  productName: "",
  price: "",
  stock: ""
};

class NewProduct extends Component {
  state = { ...initialState };

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

  addNewProduct = (e, saveNewProduct) => {
    e.preventDefault();
    saveNewProduct().then(data => {
      this.clearState();
      this.props.history.push("/product");
    });
  };

  render() {
    const { productName, price, stock } = this.state;
    const input = {
      name: productName,
      price: Number(price),
      stock: Number(stock)
    };
    return (
      <React.Fragment>
        <h1 className="text-center mb-5">New Product</h1>
        <div className="row justify-content-center">
          <Mutation mutation={NEW_PRODUCT} variables={{ input }}>
            {(saveNewProduct, { loading, error, data }) => {
              return (
                <form
                  className="col-md-8"
                  onSubmit={e => this.addNewProduct(e, saveNewProduct)}
                >
                  <div className="form-group">
                    <label>Name:</label>
                    <input
                      type="text"
                      name="productName"
                      className="form-control"
                      placeholder="Product's name"
                      onChange={this.updateState}
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
                        type="number"
                        min="0"
                        name="price"
                        className="form-control"
                        placeholder="Product's Price"
                        onChange={this.updateState}
                        value={price}
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Stock:</label>
                    <input
                      type="number"
                      min="0"
                      name="stock"
                      className="form-control"
                      placeholder="stock"
                      onChange={this.updateState}
                      value={stock}
                    />
                  </div>
                  <button
                    disabled={this.validateForm()}
                    type="submit"
                    className="btn btn-success float-right"
                  >
                    Add Product
                  </button>
                </form>
              );
            }}
          </Mutation>
        </div>
      </React.Fragment>
    );
  }
}

export default NewProduct;

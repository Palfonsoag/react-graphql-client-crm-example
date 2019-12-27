import React, { Component } from "react";
import { Mutation } from "react-apollo";
import { NEW_PRODUCT } from "../../mutations";

class NewProduct extends Component {
  state = { productName: "", price: "", stock: "" };

  updateState = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };
  validateForm = () => {
    const { productName, price, stock } = this.state;

    const disabledButton = !productName || !price || !stock;

    return disabledButton;
  };

  addNewProduct = (e, saveNewProduct) => {
    e.preventDefault();
    saveNewProduct().then(data => {
      console.log(data);
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
                        name="price"
                        className="form-control"
                        placeholder="Product's Price"
                        onChange={this.updateState}
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Stock:</label>
                    <input
                      type="number"
                      name="stock"
                      className="form-control"
                      placeholder="stock"
                      onChange={this.updateState}
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

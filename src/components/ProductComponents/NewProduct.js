import React, { Component } from "react";

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
  render() {
    return (
      <React.Fragment>
        <h1 className="text-center mb-5">New Product</h1>
        <div className="row justify-content-center">
          <form className="col-md-8">
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
        </div>
      </React.Fragment>
    );
  }
}

export default NewProduct;

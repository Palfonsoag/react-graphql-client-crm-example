import React, { Component } from "react";

class Product extends Component {
  state = {};
  render() {
    const { product, updateVolume, index, deleteProduct } = this.props;
    return (
      <React.Fragment>
        <tr>
          <td>{product.name}</td>
          <td>$ {product.price}</td>
          <td>{product.stock}</td>
          <td>
            <input
              type="number"
              className="form-control"
              onChange={e => updateVolume(e.target.value, index)}
            />
          </td>
          <td>
            <button
              type="button"
              className="btn btn-danger font-weight-bold"
              onClick={e => deleteProduct(product.id)}
            >
              &times; Delete
            </button>
          </td>
        </tr>
      </React.Fragment>
    );
  }
}

export default Product;

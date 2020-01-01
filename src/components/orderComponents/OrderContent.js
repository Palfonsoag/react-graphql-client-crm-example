import React, { Component } from "react";
import Select from "react-select";
import Animated from "react-select/animated";
import OrderResume from "./OrderResume";

class OrderContent extends Component {
  state = { products: [], total: 0 };

  selectProducts = products => {
    //console.log("aaaaaaaaa", products);
    this.setState({ products });
  };

  updateVolume = (volume, index) => {
    let newTotal = 0;

    const products = this.state.products;
    if (products.length === 0) {
      this.setState({ total: newTotal });

      return;
    }
    products[index].volume = Number(volume);
    products.map(
      product => (newTotal += product.volume * Number(product.price))
    );
    this.setState({ products, total: newTotal });
  };

  deleteProduct = id => {
    console.log(id);
  };
  render() {
    const { products } = this.props;
    return (
      <React.Fragment>
        <h2 className="text-center mb-5">Select Articles</h2>
        <Select
          onChange={this.selectProducts}
          options={products}
          isMulti
          components={Animated()}
          placeholder={"Select Products"}
          getOptionLabel={options => options.name}
          getOptionValue={options => options.id}
        />
        <OrderResume
          products={this.state.products}
          updateVolume={this.updateVolume}
          deleteProduct={this.deleteProduct}
        />
        <p className="font-weight-bold float-right">
          Total:{" "}
          <span className="font-weight-normal">$ {this.state.total}</span>
        </p>
      </React.Fragment>
    );
  }
}

export default OrderContent;

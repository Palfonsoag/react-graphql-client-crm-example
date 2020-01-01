import React, { Component } from "react";
import Select from "react-select";
import Animated from "react-select/animated";
import OrderResume from "./OrderResume";
import GenerateOrder from "./GenerateOrder";

class OrderContent extends Component {
  state = { products: [], total: 0 };

  selectProducts = products => {
    //console.log("aaaaaaaaa", products);
    this.setState({ products }, () => this.updateTotal());
  };

  updateTotal = () => {
    let newTotal = 0;

    const products = this.state.products;

    if (!products || products.length === 0) {
      this.setState({ total: newTotal });

      return;
    }

    products.map(product => {
      return (newTotal += product.volume
        ? product.volume * Number(product.price)
        : 0);
    });

    this.setState({ total: newTotal });
  };

  updateVolume = (volume, index) => {
    const products = this.state.products;

    products[index].volume = Number(volume);

    this.setState({ products }, () => this.updateTotal());
  };

  deleteProduct = id => {
    const products = this.state.products.filter(product => product.id !== id);
    this.setState({ products }, () => this.updateTotal());
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
          value={this.state.products}
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
        <GenerateOrder
          products={this.state.products}
          total={this.state.total}
        />
      </React.Fragment>
    );
  }
}

export default OrderContent;

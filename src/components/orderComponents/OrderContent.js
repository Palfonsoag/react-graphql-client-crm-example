import React, { Component } from "react";
import Select from "react-select";
import Animated from "react-select/animated";

class OrderContent extends Component {
  state = { products: [] };

  selectProducts = products => {
    //console.log("aaaaaaaaa", products);
    this.setState({ products });
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
      </React.Fragment>
    );
  }
}

export default OrderContent;

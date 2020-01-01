import React from "react";
import Product from "./Product";

const OrderResume = ({ products, updateVolume, deleteProduct }) => {
  if (products && products.length > 0) {
    return (
      <React.Fragment>
        <h2 className="text-center my-5">Order Resume</h2>
        <table className="table">
          <thead className="bg-success text-light">
            <tr className="font-weight-bold">
              <th>Product</th>
              <th>Price</th>
              <th>Stock</th>
              <th>volume</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <Product
                key={product.id}
                id={product.id}
                product={product}
                index={index}
                updateVolume={updateVolume}
                deleteProduct={deleteProduct}
              />
            ))}
          </tbody>
        </table>
      </React.Fragment>
    );
  } else {
    return <React.Fragment />;
  }
};

export default OrderResume;

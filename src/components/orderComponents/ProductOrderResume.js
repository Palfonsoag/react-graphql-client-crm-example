import React from "react";

const ProductOrderResume = ({ product, volume }) => {
  return (
    <React.Fragment>
      <div className="border mb-4 p-4">
        <p className="card-text font-weight-bold">
          Product:
          <span className="font-weight-normal"> {product.name}</span>
        </p>
        <p className="card-text font-weight-bold">
          Price:
          <span className="font-weight-normal"> $ {product.price}</span>
        </p>
        <p className="card-text font-weight-bold">
          Volume:
          <span className="font-weight-normal"> {volume}</span>
        </p>
      </div>
    </React.Fragment>
  );
};

export default ProductOrderResume;

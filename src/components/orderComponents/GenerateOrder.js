import React from "react";

const validateOrder = (products, total) => {
  let invalid = !products || total === 0;

  return invalid;
};

const GenerateOrder = ({ products, total }) => {
  return (
    <button
      type="button"
      className="btn btn-warning mt-4"
      disabled={validateOrder(products, total)}
    >
      Generate Order
    </button>
  );
};

export default GenerateOrder;

import React from "react";

const OrderByClient = props => {
  const clientId = props.match.params.id;
  console.log(clientId);
  return (
    <React.Fragment>
      <h1 className="text-center mb-5">CLient's Orders</h1>
      <div className="row"></div>
    </React.Fragment>
  );
};

export default OrderByClient;

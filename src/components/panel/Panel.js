import React from "react";
import ClientPanel from "./ClientPanel";
import SellerPanel from "./SellerPanel";

const Panel = () => {
  return (
    <React.Fragment>
      <h1 className="text-center my-5">Top 10 Buyers</h1>
      <ClientPanel />
      <h1 className="text-center my-5">Top 10 Sellers</h1>
      <SellerPanel />
    </React.Fragment>
  );
};

export default Panel;

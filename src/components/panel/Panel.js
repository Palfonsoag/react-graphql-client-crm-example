import React from "react";
import ClientPanel from "./ClientPanel";
const Panel = () => {
  return (
    <React.Fragment>
      <h1 className="text-center my-5">Top 10 Buyers</h1>
      <ClientPanel />
    </React.Fragment>
  );
};

export default Panel;

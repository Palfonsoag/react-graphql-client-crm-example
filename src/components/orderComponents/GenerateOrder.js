import React from "react";
import { Mutation } from "react-apollo";
import { GENERATE_ORDER_MUTATION } from "../../mutations";
import { withRouter } from "react-router-dom";

const validateOrder = (products, total) => {
  let invalid = !products || total <= 0;

  return invalid;
};

const GenerateOrder = ({ products, total, clientId, history, sellerId }) => {
  return (
    <Mutation
      mutation={GENERATE_ORDER_MUTATION}
      onCompleted={() => history.push("/client")}
    >
      {newOrder => (
        <button
          onClick={e => {
            const productInput = products.map(
              ({ name, price, stock, ...objectProduct }) => objectProduct
            );

            const input = {
              order: productInput,
              total,
              client: clientId,
              seller: sellerId
            };
            newOrder({ variables: { input } });
          }}
          type="button"
          className="btn btn-warning mt-4"
          disabled={validateOrder(products, total)}
        >
          Generate Order
        </button>
      )}
    </Mutation>
  );
};

export default withRouter(GenerateOrder);

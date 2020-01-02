import React from "react";
import { Query } from "react-apollo";
import { GET_ORDERS_BY_CLIENT } from "../../queries";
import Loader from "../common/Loader";
import OrderBox from "./OrderBox";

const OrderByClient = props => {
  const clientId = props.match.params.id;
  return (
    <React.Fragment>
      <h1 className="text-center mb-5">CLient's Orders</h1>
      <div className="row">
        <Query
          query={GET_ORDERS_BY_CLIENT}
          variables={{ client: clientId }}
          pollInterval={1000}
        >
          {({ loading, error, data, startPolling, stopPolling }) => {
            if (loading) return <Loader />;
            if (error) return `Error ${error.message}`;
            return data.getOrdersByClient.map(order => (
              <OrderBox key={order.id} order={order} clientId={clientId} />
            ));
          }}
        </Query>
      </div>
    </React.Fragment>
  );
};

export default OrderByClient;

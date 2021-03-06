import React from "react";
import { Query, Mutation } from "react-apollo";
import { GET_PRODUCT_QUERY } from "../../queries";
import { UPDATE_ORDER_STATE_MUTATION } from "../../mutations";
import Loader from "../common/Loader";
import ProductOrderResume from "./ProductOrderResume";
import "./order.css";

const OrderBox = props => {
  const { order, clientId } = props;
  const date = new Date(Number(order.orderDate));

  let dynamicClass =
    order.state === "PENDING"
      ? "border-light"
      : order.state === "CANCELED"
      ? "border-danger"
      : "border-success";

  return (
    <div className="col-md-4">
      <div className={`card mb-3 ${dynamicClass}`}>
        <div className="card-body">
          <p className="card-text font-weight-bold ">
            State:{" "}
            <Mutation mutation={UPDATE_ORDER_STATE_MUTATION}>
              {updateState => (
                <select
                  disabled={
                    order.state === "COMPLETED" || order.state === "CANCELED"
                      ? true
                      : false
                  }
                  className="form-control my-3"
                  value={order.state}
                  onChange={e => {
                    const input = {
                      ...order,
                      client: clientId,
                      state: e.target.value
                    };
                    if (
                      window.confirm("Do you want to change the order state?")
                    ) {
                      updateState({ variables: { input } });
                    }
                  }}
                >
                  <option value="PENDING">PENDING</option>
                  <option value="COMPLETED">COMPLETED</option>
                  <option value="CANCELED">CANCELED</option>
                </select>
              )}
            </Mutation>
          </p>
          <p className="card-text font-weight-bold">
            Order ID:
            <span className="font-weight-normal"> {order.id}</span>
          </p>
          <p className="card-text font-weight-bold">
            Order Date:
            <span className="font-weight-normal">
              {" "}
              {date.toLocaleString("en-US")}
            </span>
          </p>
          <h3 className="card-text text-center highlight-text mb-3">
            Articles of the Order
          </h3>
          {order.order.map((product, index) => {
            return (
              <Query
                key={`${order.id + index}`}
                query={GET_PRODUCT_QUERY}
                variables={{ id: product.id }}
              >
                {({ loading, error, data }) => {
                  if (loading) return <Loader />;
                  if (error) return `Error ${error.message}`;
                  return (
                    <ProductOrderResume
                      product={data.getProduct}
                      volume={product.volume}
                    />
                  );
                }}
              </Query>
            );
          })}
          <div className="d-flex align-items-center">
            <p className="card-text highlight-text bg-yellow mr-1">Total: </p>
            <p className="font-weight-normal inc-text"> $ {order.total}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderBox;

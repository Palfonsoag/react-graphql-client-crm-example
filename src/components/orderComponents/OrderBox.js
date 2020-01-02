import React from "react";
import { Query } from "react-apollo";
import { GET_PRODUCT_QUERY } from "../../queries";
import Loader from "../common/Loader";
import ProductOrderResume from "./ProductOrderResume";

const OrderBox = props => {
  const { order, clientId } = props;
  const date = new Date(Number(order.orderDate));
  console.log(props);
  return (
    <div className="col-md-4">
      <div className={`card mb-3`}>
        <div className="card-body">
          <p className="card-text font-weight-bold ">
            State:
            <select
              className="form-control my-3"
              value={order.state}
              onChange={e => {
                const input = {
                  ...order,
                  client: clientId,
                  state: e.target.value
                };

                console.log(input);
              }}
            >
              <option value="PENDING">PENDING</option>
              <option value="COMPLETED">COMPLETED</option>
              <option value="CANCELED">CANCELED</option>
            </select>
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
          <p className="card-text font-weight-bold">
            Total:
            <span className="font-weight-normal"> $ {order.total}</span>
          </p>

          <h3 className="card-text text-center mb-3">Articles of the Order</h3>
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
        </div>
      </div>
    </div>
  );
};

export default OrderBox;

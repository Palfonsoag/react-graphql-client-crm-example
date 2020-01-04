import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import { Query } from "react-apollo";
import { GET_TOP_SELLER_QUERY } from "../../queries";
import Loader from "../common/Loader";

const SellerPanel = () => {
  return (
    <Query query={GET_TOP_SELLER_QUERY} pollInterval={5000}>
      {({ loading, error, data, startPolling, stopPolling }) => {
        if (loading) return <Loader />;
        if (error) return `Error ${error.message}`;
        const topSellersGraphic = [];
        console.log(data);

        if (data && data.topSellers && data.topSellers.length > 0) {
          data.topSellers.map((seller, index) => {
            topSellersGraphic[index] = {
              name: seller.seller[0].name,
              total: seller.total
            };
            return "";
          });
          return (
            <BarChart
              width={1100}
              height={400}
              data={topSellersGraphic}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="total" fill="#6148b9" />
            </BarChart>
          );
        } else {
          return <h2 className="text-center my-5">There Are no sales yet</h2>;
        }
      }}
    </Query>
  );
};

export default SellerPanel;

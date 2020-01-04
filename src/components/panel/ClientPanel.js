import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import { Query } from "react-apollo";
import { TOP_TEN_BUYERS } from "../../queries";
import Loader from "../common/Loader";

const ClientPanel = () => {
  return (
    <Query query={TOP_TEN_BUYERS} pollInterval={5000}>
      {({ loading, error, data, startPolling, stopPolling }) => {
        if (loading) return <Loader />;
        if (error) return `Error ${error.message}`;
        const topClientGraphic = [];
        // console.log(data);

        if (data && data.topClients && data.topClients.length > 0) {
          data.topClients.map((order, index) => {
            topClientGraphic[index] = {
              name:
                order.client[0].name +
                " " +
                order.client[0].lastName.substring(0, 1),
              total: order.total
            };
            return "";
          });
          return (
            <BarChart
              width={1100}
              height={400}
              data={topClientGraphic}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="total" fill="#10a98b" />
            </BarChart>
          );
        } else {
          return <h2 className="text-center my-5">There Are no buyers yet</h2>;
        }
      }}
    </Query>
  );
};

export default ClientPanel;

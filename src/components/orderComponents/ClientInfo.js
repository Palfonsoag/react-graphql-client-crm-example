import React from "react";
import { Query } from "react-apollo";
import { GET_CLIENT_QUERY } from "../../queries";
import Loader from "../common/Loader";

const ClientInfo = ({ id }) => {
  return (
    <React.Fragment>
      <h2 className="text-center mb-3">Client Resume</h2>
      <Query query={GET_CLIENT_QUERY} variables={{ id }} pollInterval={1000}>
        {({ loading, error, data, startPolling, stopPolling }) => {
          if (loading) return <Loader />;
          if (error) return `Error ${error.message}`;

          //console.log(data.getClient);
          const {
            name,
            lastName,
            company,
            age,
            clientType,
            emails
          } = data.getClient;
          return (
            <ul className="list-unstyled my-5">
              <li className="border font-weight-bold p-2">
                Name:<span className="font-weight-normal"> {name}</span>
              </li>
              <li className="border font-weight-bold p-2">
                Last Name:
                <span className="font-weight-normal"> {lastName}</span>
              </li>
              <li className="border font-weight-bold p-2">
                Company:<span className="font-weight-normal"> {company}</span>
              </li>
              <li className="border font-weight-bold p-2">
                Email:
                <span className="font-weight-normal">
                  {" "}
                  {emails.map(email => ` ${email.email}`)}
                </span>
              </li>
              <li className="border font-weight-bold p-2">
                Age:<span className="font-weight-normal"> {age}</span>
              </li>
              <li className="border font-weight-bold p-2">
                Type:<span className="font-weight-normal"> {clientType}</span>
              </li>
            </ul>
          );
        }}
      </Query>
    </React.Fragment>
  );
};

export default ClientInfo;

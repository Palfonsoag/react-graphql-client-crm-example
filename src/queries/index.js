import gql from "graphql-tag";

export const GET_CLIENTS_QUERY = gql`
  {
    getClients {
      id
      name
      lastName
      company
    }
  }
`;

export const GET_CLIENT_QUERY = gql`
  query getClientInfo($id: ID) {
    getClient(id: $id) {
      id
      name
      lastName
      company
      age
      emails {
        email
      }
      clientType
    }
  }
`;

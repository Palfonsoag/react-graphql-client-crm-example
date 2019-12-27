import gql from "graphql-tag";

export const GET_CLIENTS_QUERY = gql`
  query getClients($limit: Int, $offset: Int) {
    getClients(limit: $limit, offset: $offset) {
      id
      name
      lastName
      company
    }
    totalClients
  }
`;

export const GET_CLIENT_QUERY = gql`
  query getClient($id: ID!) {
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

export const GET_PRODUCTS_QUERY = gql`
  query {
    getProducts {
      id
      name
      price
      stock
    }
  }
`;

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
  query getProducts($limit: Int, $offset: Int, $stock: Boolean) {
    getProducts(limit: $limit, offset: $offset, stock: $stock) {
      id
      name
      price
      stock
    }
    totalProducts
  }
`;

export const GET_PRODUCT_QUERY = gql`
  query getProduct($id: ID!) {
    getProduct(id: $id) {
      name
      price
      stock
    }
  }
`;

export const GET_ORDERS_BY_CLIENT = gql`
  query getOrdersByClient($client: String) {
    getOrdersByClient(client: $client) {
      id
      total
      orderDate
      state
      order {
        id
        volume
      }
    }
  }
`;

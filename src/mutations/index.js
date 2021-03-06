import gql from "graphql-tag";

export const NEW_CLIENT_MUTATION = gql`
  mutation createClient($input: ClientInput) {
    createClient(input: $input) {
      id
      name
      lastName
    }
  }
`;

export const EDIT_CLIENT_MUTATION = gql`
  mutation updateClientInfo($input: ClientInput) {
    updateClient(input: $input) {
      id
      name
      lastName
      age
      company
      clientType
      emails {
        email
      }
    }
  }
`;

export const DELETE_CLIENT_MUTATION = gql`
  mutation eraseClient($id: ID!) {
    deleteClient(id: $id)
  }
`;

export const NEW_PRODUCT = gql`
  mutation createProduct($input: ProductInput) {
    createProduct(input: $input) {
      id
      name
      price
      stock
    }
  }
`;

export const DELETE_PRODUCT_MUTATION = gql`
  mutation deleteProduct($id: ID!) {
    deleteProduct(id: $id)
  }
`;

export const UPDATE_PRODUCT_MUTATION = gql`
  mutation updateProduct($input: ProductInput) {
    updateProduct(input: $input) {
      name
      price
      stock
    }
  }
`;

export const GENERATE_ORDER_MUTATION = gql`
  mutation createOrder($input: OrderInput) {
    createOrder(input: $input) {
      id
    }
  }
`;

export const UPDATE_ORDER_STATE_MUTATION = gql`
  mutation updateOrderState($input: OrderInput) {
    updateOrderState(input: $input)
  }
`;

export const REGISTER_NEW_USER_MUTATION = gql`
  mutation createUser($input: UserInput) {
    createUser(input: $input)
  }
`;

export const AUTHENTICATE_USER_MUTATION = gql`
  mutation userAuthentication($user: String!, $password: String!) {
    userAuthentication(user: $user, password: $password) {
      token
    }
  }
`;

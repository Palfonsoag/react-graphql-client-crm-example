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
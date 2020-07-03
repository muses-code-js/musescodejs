import gql from 'graphql-tag';

export const SEND_MESSAGE = gql`
  mutation SendMessage(
    $name: String!
    $email: String!
    $city: Select!
    $message: String!
    $createdAt: DateTime!
  ) {
    sendMessage(
      data: { name: $name, email: $email, city: $city, message: $message, createdAt: $createdAt }
    ) {
      id
    }
  }
`;

// const CREATE_USER = gql`
//   mutation CreateUser($name: String!, $email: String!, $password: String!) {
//     createUser(data: { name: $name, email: $email, password: $password }) {
//       id
//     }
//   }
// `;

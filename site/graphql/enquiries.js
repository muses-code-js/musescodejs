import gql from 'graphql-tag';

export const SEND_MESSAGE = gql`
  mutation SendMessage($name: String!, $email: String!, $city: String!, $message: String!, $createdAt: DateTime!)
    sendMessage(
      data: {
        name: $name
        email: $email
        city: $city
        message: $message
        createdAt: $createdAt
      }
    ) {
      id
    }
  `;

// const ADD_RSVP = gql`
//   mutation AddRsvp($event: ID!, $user: ID!, $status: RsvpStatusType!) {
//     createRsvp(
//       data: {
//         event: { connect: { id: $event } }
//         user: { connect: { id: $user } }
//         status: $status
//       }
//     ) {
//       id
//       event {
//         id
//       }
//       status
//     }
//   }
// `;

// const CREATE_USER = gql`
//   mutation CreateUser($name: String!, $email: String!, $password: String!) {
//     createUser(data: { name: $name, email: $email, password: $password }) {
//       id
//     }
//   }
// `;

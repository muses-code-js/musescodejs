import gql from 'graphql-tag';

export const SEND_ENQUIRY = gql`
  mutation CreateEnquiry(
    $name: String!
    $email: String!
    $city: EnquiryCityType!
    $message: String!
    $createdAt: DateTime!
  ) {
    createEnquiry(
      data: { name: $name, email: $email, city: $city, message: $message, createdAt: $createdAt }
    ) {
      id
    }
  }
`;

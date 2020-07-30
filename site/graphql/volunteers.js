import gql from 'graphql-tag';

export const BECOME_VOLUNTEER = gql`
  mutation CreateVolunteer(
    $name: String!
    $email: String!
    $city: VolunteerCityType!
    $how: String!
    $other: String!
    $comment: String!
  ) {
    createVolunteer(
      data: { name: $name, email: $email, city: $city, how: $how, other: $other, comment: $comment }
    ) {
      id
    }
  }
`;

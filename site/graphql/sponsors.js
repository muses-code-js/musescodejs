import gql from 'graphql-tag';

export const GET_ALL_SPONSORS = gql`
  {
    allSponsors {
      id,
      company,
      category,
      website,
      status,
      image {
        publicUrlTransformed(
          transformation: { 
          crop: "fit"
          flags: "progressive"
          height: "100"
          quality: "auto"
          width: "100"}
        )
      },

    }
  }
`;

export const CREATE_SPONSOR_REQUEST = gql`
mutation CreateSponsor (
  $company: String!, 
  $contact: String!, 
  $email: String!, 
  $city: String!, 
  $sponsor: String!, 
  $address: String, 
  $capacity: String, 
  $notes: String
  ){
  createSponsor (
    data:{ 
      company: $company, 
      contact: $contact, 
      email: $email, 
      city: $city, 
      sponsor: $sponsor, 
      address: $address, 
      capacity: $capacity, 
      notes: $notes 
    }) 
  {
  id
  }
}
`;

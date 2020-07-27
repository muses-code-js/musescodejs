import gql from 'graphql-tag';

export const GET_ALL_SPONSORS = gql`
  {
    allSponsors {
      id,
      company,
      category,
      website,
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
mutation CreateSponsorRequest (
  $company: String!, 
  $contact: String!, 
  $email: String!, 
  $city: String!, 
  $sponsor: String!, 
  $address: String, 
  $capacity: String, 
  $notes: String
  ){
  createSponsorRequest (
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

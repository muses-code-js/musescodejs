import gql from 'graphql-tag';

export const GET_SPONSORS = gql`
  query {
    allSponsors {
      id
      name
      website
      logo {
        publicUrl
      }
    }
  }
`;


export const SPONSOR_DATA = gql`
  fragment GetSponsor on Sponsor {
    id
    name
    website
    logo {
      publicUrl
    }
  }
`;

export const GET_ALL_SPONSORS = gql`
  {
    allSponsors(orderBy: "name") {
      ...GetSponsor
    }
  }
  ${SPONSOR_DATA}
  `;
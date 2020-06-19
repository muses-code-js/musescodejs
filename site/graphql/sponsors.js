import gql from 'graphql-tag';

export const GET_SPONSORS = gql`
  query {
    allSponsors {
      id
      name
      website
      level {
        id
        name
        colour
      }
      logo {
        id
      }
    }
  }
`;

export const GET_ALL_SPONSORS = gql`
  {
    allSponsors {
      id,
      name,
      category,
      website,
      logo {
        id
      },
  
    }
  }
`;
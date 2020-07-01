import gql from 'graphql-tag';

export const GET_SPONSORS = gql`
  query {
    allSponsors {
      id
      company
      website
      category 
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
      company,
      category,
      website,
      logo {
        id
      },
  
    }
  }
`;
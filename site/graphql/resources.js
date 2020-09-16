import gql from 'graphql-tag';

export const GET_ALL_RESOURCES = gql`
  query {
    allResources {
      id
      title
      topic
      level
      url
    }
  }
`;

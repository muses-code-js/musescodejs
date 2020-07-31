import gql from 'graphql-tag';

export const RESOURCE_DATA = gql`
    fragment ResourceData on Resource{
        id
        title
        topic
        level
        url
    }
`;

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
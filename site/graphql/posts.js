import gql from 'graphql-tag';

export const POST_DATA = gql`
  fragment PostData on Post {
    id
    title
    slug
    author
    date
    description
  }
`;

export const GET_ALL_POSTS = gql`
  {
    allPosts(where: { id_not: null }, orderBy: "date_DESC") {
      ...PostData
    }
  }
  ${POST_DATA}
`;

export const GET_POST_DETAILS = gql`
  query GetPostDetails($slug: String) {
    allPosts(where: { slug: $slug }) {
      ...PostData
    }
  }
  ${POST_DATA}
`;

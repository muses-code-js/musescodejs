import gql from 'graphql-tag';

export const GET_ALL_SPONSORS = gql`
  {
    allSponsors {
      id,
      name,
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
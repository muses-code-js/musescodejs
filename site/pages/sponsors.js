/** @jsx jsx */
import { useQuery } from '@apollo/react-hooks';
import { jsx } from '@emotion/core';

import { Container, H2, Loading } from '../primitives';
import SponsorItem from '../components/SponsorsItems';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Meta from '../components/Meta';
import { gridSize } from '../theme';


import { GET_ALL_SPONSORS } from '../graphql/sponsors';

function Sponsors() {
  const { data, loading, error } = useQuery(GET_ALL_SPONSORS);
  
  if (error) {
    console.error('Failed to load sponsors', error);
  }
 
  return (
    <>
      <Meta title="Sponsors"/>
      <Navbar />
      <Container css={{ marginTop: gridSize * 3}}>
      <H2 hasSeparator>Sponsors</H2>
       {loading ? (
          <Loading isCentered size="xlarge" />
        ) : error ? (
          <p>Something went wrong. Please try again.</p>
        ) : (
          <SponsorItem sponsors={data.allSponsors}/> 
        )}
      </Container>
      <Footer />
    </>
  );
};

export default Sponsors;

/** @jsx jsx */
import { useQuery } from '@apollo/react-hooks';
import getConfig from 'next/config';
import { jsx } from '@emotion/core';

import { Container, H2, H3, H5, Html, Loading } from '../primitives';
import SponsorsItem from '../components/SponsorsItems';
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
       <H2>Sponsors</H2>
        {loading ? (
          <Loading isCentered size="xlarge" />
        ) : error ? (
          <p>Something went wrong. Please try again.</p>
        ) : (
          <SponsorsItem sponsors={data.allSponsors}/>
        )}
      </Container>
      <Footer />
    </>
  );
};

export default Sponsors;
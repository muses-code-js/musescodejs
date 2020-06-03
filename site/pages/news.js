import { jsx } from '@emotion/core';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Meta from '../components/Meta';
import { colors, gridSize } from '../theme';
import { useQuery } from '@apollo/react-hooks';

import { Container, H1 } from '../primitives';

const News = () => {
  return (
    <>
      <Meta
        title="News"
        description="Here you can read articles about coding or inform yourself about events happening  near you."
      />

      <Navbar />
      <Container css={{ marginTop: gridSize * 3 }}>
        <H1 hasSeparator css={{ marginBottom: '0.66em' }}>
          News
        </H1>
      </Container>
      <Footer />
    </>
  );
};

export default News;

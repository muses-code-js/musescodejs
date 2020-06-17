/** @jsx jsx */
import { jsx } from '@emotion/core';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Meta from '../components/Meta';
import { gridSize } from '../theme';
import { useQuery } from '@apollo/react-hooks';
import { GET_ALL_POSTS } from '../graphql/posts';
import NewsItems from '../components/NewsItems';

import { Container, H2, Loading } from '../primitives';

const News = () => {
  const { data, loading, error } = useQuery(GET_ALL_POSTS);
  if (error) {
    console.error('Failed to load articles.', error);
  }
  return (
    <>
      <Meta
        title="News"
        description="Here you can read articles about coding or inform yourself about events happening  near you."
      />

      <Navbar />
      <Container css={{ marginTop: gridSize * 3 }}>
        <H2 hasSeparator>Articles</H2>
        {loading ? (
          <Loading isCentered size="xlarge" />
        ) : error ? (
          <p>Something went wrong. Please try again.</p>
        ) : (
          <NewsItems posts={data.allPosts} />
        )}
      </Container>
      <Footer />
    </>
  );
};

export default News;

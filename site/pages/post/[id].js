/** @jsx jsx */
import { jsx } from '@emotion/core';
import { useQuery } from '@apollo/react-hooks';

import { Error, Hero, Loading, H4, Html, Container } from '../../primitives';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import Meta, { makeMetaUrl } from '../../components/Meta';
import { GET_POST_DETAILS } from '../../graphql/posts';
import { formatPastDate, stripTags } from '../../helpers';

const Post = ({ id, loadingColor }) => {
  const { data, loading, error } = useQuery(GET_POST_DETAILS, { variables: { post: id } });

  if (loading) return <Loading isCentered color={loadingColor} size="xlarge" />;

  if (error) {
    console.error('Failed to load post', id, error);
    return <Error message="Something went wrong. Please try again later." />;
  }
  if (!data.Post) {
    return <p>Post not found</p>;
  }

  const { description, title, date, author } = data.Post;

  const prettyDate = formatPastDate(date);

  const metaDescription = `${prettyDate} -- ${stripTags(description)}`;

  return (
    <>
      <Meta title={title} description={stripTags(description)}>
        <meta property="og:description" content={metaDescription} />
        <meta property="og:url" content={makeMetaUrl(`/post/${id}`)} />
        <meta property="og:title" content={title} />
        <meta property="og:type" content="article" />
        <meta name="twitter:description" content={metaDescription} />
      </Meta>
      <Navbar />
      <Hero align="left" superTitle={prettyDate} title={title}>
        <H4 css={{ fontWeight: 100 }}>By: {author}</H4>
      </Hero>
      <Container>
        <Html markup={description} />
      </Container>
      <Footer />
    </>
  );
};

Post.getInitialProps = ({ query }) => {
  const { id, hex } = query;
  return { id, loadingColor: hex ? `#${hex}` : 'currentColor' };
};

export default Post;

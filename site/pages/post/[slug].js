/** @jsx jsx */
import { jsx } from '@emotion/core';
import { useQuery } from '@apollo/react-hooks';

import { Error, Hero, Loading, H4, Html, Container } from '../../primitives';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import Meta, { makeMetaUrl } from '../../components/Meta';
import { GET_POST_DETAILS } from '../../graphql/posts';
import { formatPastDate, stripTags } from '../../helpers';

const Post = ({ slug, loadingColor }) => {
  const { data, loading, error } = useQuery(GET_POST_DETAILS, { variables: { post: slug } });

  if (loading) return <Loading isCentered color={loadingColor} size="xlarge" />;

  if (error) {
    console.error('Failed to load post', slug, error);
    return <Error message="Something went wrong. Please try again later." />;
  }

  const postObj = data.allPosts.find(postObj => postObj.slug == slug);

  if (!postObj) {
    return <Error message="Post not found" />;
  }

  const { description, title, date, author } = postObj;

  const prettyDate = formatPastDate(date);

  const metaDescription = `${prettyDate} -- ${stripTags(description)}`;

  return (
    <>
      <Meta title={title} description={stripTags(description)}>
        <meta property="og:description" content={metaDescription} />
        <meta property="og:url" content={makeMetaUrl(`/post/${slug}`)} />
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
  const { slug, hex } = query;
  return { slug, loadingColor: hex ? `#${hex}` : 'currentColor' };
};

export default Post;

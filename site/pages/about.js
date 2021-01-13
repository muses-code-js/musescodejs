/** @jsx jsx */

import { useQuery } from '@apollo/react-hooks';
import { jsx } from '@emotion/react';

import { Avatar, Container, Error, H1, H3, Loading } from '../primitives';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Meta from '../components/Meta';
import { colors, gridSize } from '../theme';
import { GET_ORGANISERS } from '../graphql/organisers';
import { mq } from '../helpers/media';

const About = () => {
  const { data, loading, error } = useQuery(GET_ORGANISERS);
  const hasOrganisers = Boolean(data && data.allOrganisers && data.allOrganisers.length);
  const allOrganisers = hasOrganisers
    ? data.allOrganisers.filter((o) => o.user).map((o) => o.user)
    : [];
  return (
    <>
      <Meta
        title="About"
        description="Muses run JavaScript and Node.js workshops for women, non-binary and trans folk around Australia."
      />
      <Navbar />
      <Container css={{ marginTop: gridSize * 3 }}>
        <H1 hasSeparator css={{ marginBottom: '0.66em' }}>
          About
        </H1>
        <Content>
          <p>
            Muses run JavaScript and Node.js workshops for women, non-binary and trans folk around
            Australia.
          </p>
          <p>
            We believe that everyone should try programming at least once in their life. Therefore
            we created a community where, in a friendly atmosphere with a great vibe you can try
            programming for the first time or, if you already code, learn something new about
            JavaScript and/or Node.js.
          </p>
          <p>
            Our half day coding bootcamps are also a great opportunity to grow your network and meet
            new people with similar interests. Come and join our next half-day coding bootcamp with
            lunch provided.
          </p>
        </Content>

        {loading ? (
          <Loading />
        ) : error ? (
          <Error error={error} />
        ) : !hasOrganisers ? null : (
          <OrganiserList
            title={
              <H3 size={5} css={{ marginBottom: '0.66em' }}>
                Organisers
              </H3>
            }
          >
            {allOrganisers.map((organiser) => {
              return <Organiser key={organiser.id} organiser={organiser} />;
            })}
          </OrganiserList>
        )}
      </Container>
      <Footer />
    </>
  );
};

const twitterLink = (handle) => `https://twitter.com/${handle.slice(1)}`;

const OrganiserList = ({ title, ...props }) => (
  <div
    css={mq({
      backgroundColor: colors.greyLight,
      padding: '1.5rem',
    })}
  >
    {title}
    <ul
      css={mq({
        display: 'flex',
        flexDirection: ['column', 'row'],
        justifyContent: 'space-between',
        listStyle: 'none',
        margin: 0,
        padding: 0,
      })}
      {...props}
    />
  </div>
);
const Organiser = ({ organiser }) => (
  <li
    css={mq({
      display: 'flex',
      listStyle: 'none',
      margin: 0,
      padding: 0,

      ':not(:first-of-type)': {
        marginTop: ['1em', 0],
      },
    })}
  >
    <Avatar name={organiser.name} src={organiser.image && organiser.image.small} />
    <div css={{ marginLeft: '1em' }}>
      <div css={{ fontWeight: 'bold' }}>{organiser.name}</div>
      {organiser.twitterHandle && (
        <a
          css={{ color: colors.greyDark }}
          href={twitterLink(organiser.twitterHandle)}
          target="_blank"
          rel="noreferrer"
        >
          {organiser.twitterHandle}
        </a>
      )}
    </div>
  </li>
);
const Content = (props) => <div css={{ maxWidth: 720 }} {...props} />;

export default About;

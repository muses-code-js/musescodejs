/** @jsx jsx */
import { useQuery } from '@apollo/react-hooks';
import { jsx } from '@emotion/core';

import { Container, H2, Loading, Button } from '../primitives';
import SponsorItem from '../components/SponsorsItems';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Meta from '../components/Meta';
import { colors, gridSize } from '../theme';
import { getForegroundColor } from '../helpers';


import { GET_ALL_SPONSORS } from '../graphql/sponsors';

function Sponsors() {
  const { data, loading, error } = useQuery(GET_ALL_SPONSORS);
  const button = {
    bg: colors.cornflowerblue,
    fg: getForegroundColor(colors.cornflowerblue)
  };
  
  if (error) {
    console.error('Failed to load sponsors', error);
  }
 
  return (
    <>
      <Meta title="Sponsors"/>
      <Navbar />
      <Container css={{ marginTop: gridSize * 3}}>
        <div css={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <H2 hasSeparator>Sponsors</H2>
          <Button css={{ color: `${colors.white}`}}background={button.bg} foreground={button.fg} size='small' href="/sponsors/request">Become a Sponsor</Button>
        </div>
        <p>Supporting MusesCodeJS is an excellent opportunity to contribute to the community by encouraging women who 
          haven’t had the chance to understand/experience what it’s like to build the internet. 
        </p>
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

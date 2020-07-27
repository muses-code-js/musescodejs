/** @jsx jsx */

import { jsx } from '@emotion/core';

import { Container, H2 } from '../primitives';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Meta from '../components/Meta';
import { gridSize } from '../theme';
import SponsorForm from '../components/SponsorRequest';

const newSponsor = () => {
  return (
    <>
      <Meta title="Become a Sponsor" />
      <Navbar background="white" />
      <Container css={{ marginTop: gridSize * 3}}>
        <H2 hasSeparator>Become a Sponsor</H2>
        <p>
          Thanks so much for being willing to sponsor us! We really appreciate our sponsors - these events aren't possible without the venue, food, 
          and wifi our sponsors provide. And being a sponsor is a great way to show our members your offices, let them know if you're hiring, and make 
          it clear how much the industry supports women in IT.
        </p>
        <p>
          Please, fill in the form below, and one of our organizators will get in touch with you shortly.
        </p>
        <SponsorForm />
      </Container>
      <Footer/>
    </>
  );
};

export default newSponsor;

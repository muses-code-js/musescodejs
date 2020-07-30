/** @jsx jsx */
import { jsx } from '@emotion/core';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Meta from '../components/Meta';
import VolunteersForm from '../components/MentorsForm/index';

import { gridSize } from '../theme';
import { Container, H2 } from '../primitives';

const BecomeVolunteer = () => {
  return (
    <>
      <Meta title="Become a volunteer" />
      <Navbar />
      <Container css={{ marginTop: gridSize * 3 }}>
        <H2 hasSeparator>Become a volunteer</H2>        
        <VolunteersForm />        
      </Container>
      <Footer />
    </>
  );
};

export default BecomeVolunteer;
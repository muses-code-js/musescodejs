/** @jsx jsx */
import { jsx } from '@emotion/core';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Meta from '../components/Meta';
import VolunteersForm from '../components/VolunteersForm';

import { gridSize } from '../theme';
import { Container, H2 } from '../primitives';

const Volunteer = () => {
  return (
    <>
      <Meta title="Volunteer" />
      <Navbar />
      <Container css={{ marginTop: gridSize * 3 }}>
        <H2 hasSeparator>Volunteer</H2>        
        <VolunteersForm />        
      </Container>
      <Footer />
    </>
  );
};

export default Volunteer;
/** @jsx jsx */
import { jsx } from '@emotion/core';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Meta from '../components/Meta';
import ContactForm from '../components/ContactForm/index';

import { gridSize } from '../theme';

import { Container, H2 } from '../primitives';

const style = {
  marginTop: gridSize * 5,
  maxWidth: 700,
}

const Contact = () => {
  return (
    <>
      <Meta title="Contact" />
      <Navbar />
      <Container css={{ marginTop: gridSize * 3 }}>
        <H2 hasSeparator>Contact</H2>
        <ContactForm css={style} />        
      </Container>
      <Footer />
    </>
  );
};




export default Contact;

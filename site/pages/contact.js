/** @jsx jsx */
import { jsx } from '@emotion/core';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Meta from '../components/Meta';
import ContactForm from '../components/ContactForm/index';

import { gridSize } from '../theme';

import { Container, H2 } from '../primitives';

const Contact = ({ ...props }) => {
  return (
    <>
      <Meta title="Contact" />
      <Navbar />
      <Container css={{ marginTop: gridSize * 3 }}>
        <H2 hasSeparator>Contact</H2>
        <Content {...props}>
          <ContactForm css={{ marginTop: gridSize * 5 }} />
        </Content>
      </Container>
      <Footer />
    </>
  );
};

const Content = props => <div css={{ maxWidth: 720 }} {...props} />;

export default Contact;

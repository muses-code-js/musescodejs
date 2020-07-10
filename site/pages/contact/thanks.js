/** @jsx jsx */
import { jsx } from '@emotion/core';
import Router from 'next/router';

import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import Meta from '../../components/Meta';

import { gridSize } from '../../theme';

import { Container, H2, Button} from '../../primitives';

const Thanks = () => {
  return (
    <>
      <Meta title="Contact/thanks" />
      <Navbar />
      <Container css={{ marginTop: gridSize * 3 }}>
        <div css={divStyle}> 
          <H2 css={{marginBottom: gridSize * 3 }}>Thank you!</H2>
          <p>Your message has been sent and a member of our team
will be in touch with you shortly.</p>
          <Button css={btnStyle} 
          onClick={e => { e.preventDefault();            
            Router.push('/contact');
          }}> Send another message </Button>

        </div>
      </Container>
      <Footer />
    </>
  );
};

const divStyle = {  
    height: 200,
    textAlign: "center",  
}

const btnStyle = {
  marginTop: gridSize * 2,
  color: "white",
  cursor: "pointer"
}

export default Thanks;
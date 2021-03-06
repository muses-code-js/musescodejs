/** @jsxImportSource @emotion/react */
import React, { useEffect } from 'react';
import Router from 'next/router';

import { useAuth } from '../lib/authetication';
import { Container } from '../primitives';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Meta from '../components/Meta';

const SignOut = () => {
  const { isAuthenticated, signout } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      Router.push('/');
      return;
    }
    signout();
  }, [isAuthenticated]);

  return (
    <>
      <Meta title="Sign out" />
      <Navbar background="white" />
      <Container>
        <p css={{ margin: '100px', textAlign: 'center' }}>Signing you out...</p>
      </Container>
      <Footer callToAction={false} />
    </>
  );
};

export default SignOut;

/** @jsxImportSource @emotion/react */
import React, { useEffect } from 'react';
import Router from 'next/router';

import Signin from '../components/auth/signin';
import { useAuth } from '../lib/authetication';
import { Container, H1 } from '../primitives';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Meta from '../components/Meta';
import { gridSize } from '../theme';

const SignIn = () => {
  const { isAuthenticated } = useAuth();

  // if the user is logged in, redirect to the homepage
  useEffect(() => {
    if (isAuthenticated) {
      Router.push('/profile');
    }
  }, [isAuthenticated]);

  return (
    <>
      <Meta title="Sign in" />
      <Navbar background="white" />
      <Container width={420} css={{ marginTop: gridSize * 3 }}>
        <H1>Sign in</H1>
        <Signin />
      </Container>
      <Footer callToAction={false} />
    </>
  );
};

export default SignIn;

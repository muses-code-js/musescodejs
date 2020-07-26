/** @jsx jsx */

import { jsx } from '@emotion/core';
import { useState, useEffect } from 'react';
import Router from 'next/router';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import { useAuth } from '../../lib/authetication';

const ForgotPasswordForm = () => {
  const [email, setEmail] = useState('');
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      Router.push('/');
    }
  }, [isAuthenticated]);

  return <div>Hello World!</div>;
};

const CREATE_FORGOT_PASSWORD_TOKEN = gql`
  mutation startPasswordRecovery($email: String!) {
    startPasswordRecovery(email: $email)
  }
`;

export default ForgotPasswordForm;

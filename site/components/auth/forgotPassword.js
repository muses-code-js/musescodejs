/** @jsxImportSource @emotion/react */
import React, { useState, useEffect } from 'react';
import { Mutation } from 'react-apollo';
import Router from 'next/router';
import gql from 'graphql-tag';

import { useAuth } from '../../lib/authetication';
import { Button, Field, Group, Label, Link, Input } from '../../primitives/forms';
import { gridSize, colors } from '../../theme';

export const CREATE_FOGOT_PASSWORD_TOKEN = gql`
  mutation startPasswordRecovery($email: String!) {
    startPasswordRecovery(email: $email) {
      id
    }
  }
`;

const ForgotPassword = ({ onSuccess, onClickSignin }) => {
  const [email, setEmail] = useState('');
  const [emailSent, setEmailSent] = useState(false);
  const { isAuthenticated } = useAuth();

  const handleSubmit = (startPasswordRecovery) => (event) => {
    event.preventDefault();
    startPasswordRecovery({ variables: { email } });
  };

  // if the user is logged in, redirect to the homepage
  useEffect(() => {
    if (isAuthenticated) {
      Router.push('/');
    }
  }, [isAuthenticated]);

  return (
    <Mutation
      mutation={CREATE_FOGOT_PASSWORD_TOKEN}
      onCompleted={() => {
        setEmailSent(true);

        if (onSuccess && typeof onSuccess === 'function') {
          onSuccess();
        }
      }}
    >
      {(startPasswordRecovery, { error: mutationError, loading }) => {
        return (
          <>
            {mutationError && (
              <p css={{ color: colors.red }}>
                There is no account with the email &quot;{email}&quot;
              </p>
            )}

            <form
              css={{ marginTop: gridSize * 3 }}
              noValidate
              onSubmit={handleSubmit(startPasswordRecovery)}
            >
              <Field>
                <Label htmlFor="email">Email</Label>
                <Input
                  required
                  type="text"
                  autoFocus
                  autoComplete="email"
                  placeholder="you@awesome.com"
                  disabled={isAuthenticated}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Field>

              <Group>
                {loading ? (
                  <Button disabled>Sending email...</Button>
                ) : emailSent ? (
                  <Button disabled css={{ background: colors.greyLight, color: colors.greyMedium }}>
                    Email sent
                  </Button>
                ) : (
                  <Button type="submit">Send</Button>
                )}
                <Link href="/signin" onClick={onClickSignin}>
                  Sign in
                </Link>
              </Group>
            </form>
          </>
        );
      }}
    </Mutation>
  );
};

export default ForgotPassword;

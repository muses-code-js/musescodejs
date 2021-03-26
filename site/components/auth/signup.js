/** @jsxImportSource @emotion/react */
import React from 'react';
import gql from 'graphql-tag';
import { useState, useEffect } from 'react';
import { useMutation } from '@apollo/react-hooks';
import Router from 'next/router';

import { useAuth } from '../../lib/authetication';
import { Button, Field, Label, Input } from '../../primitives/forms';
import { gridSize, colors } from '../../theme';

const onChange = (handler) => (e) => handler(e.target.value);

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorState, setErrorState] = useState(false);
  const { isAuthenticated, signin } = useAuth();

  const [createUser, { loading, error }] = useMutation(CREATE_USER, {
    onCompleted: async () => {
      setErrorState(false);
      try {
        await signin({ email, password });
        setErrorState(false);
      } catch {
        setErrorState(true);
      }
    },
    onError: () => {
      setErrorState(true);
    },
  });

  // if the user is logged in, redirect to the homepage
  useEffect(() => {
    if (isAuthenticated) {
      Router.push('/');
    }
  }, [isAuthenticated]);

  return (
    <>
      {error && <p css={{ color: colors.red }}>The email provided is already in use.</p>}
      {errorState && <p css={{ color: colors.red }}>An unknown error has occured</p>}
      <form
        css={{ marginTop: gridSize * 3 }}
        noValidate
        onSubmit={(e) => {
          e.preventDefault();
          createUser({ variables: { name, email, password } });
        }}
      >
        <Field>
          <Label htmlFor="name">Name</Label>
          <Input
            autoComplete="name"
            autoFocus
            disabled={loading || isAuthenticated}
            id="name"
            onChange={onChange(setName)}
            placeholder="full name"
            required
            type="text"
            value={name}
          />
        </Field>

        <Field>
          <Label htmlFor="email">Email</Label>
          <Input
            autoComplete="email"
            disabled={loading || isAuthenticated}
            id="email"
            onChange={onChange(setEmail)}
            placeholder="you@awesome.com"
            required
            type="text"
            value={email}
          />
        </Field>
        <Field>
          <Label htmlFor="password">Password</Label>
          <Input
            autoComplete="password"
            disabled={loading || isAuthenticated}
            id="password"
            minLength="8"
            onChange={onChange(setPassword)}
            placeholder="supersecret"
            required
            type="password"
            value={password}
          />
        </Field>

        {loading ? (
          <Button disabled>Creating account...</Button>
        ) : (
          <Button type="submit">Sign up</Button>
        )}
      </form>
    </>
  );
};

export default Signup;

const CREATE_USER = gql`
  mutation CreateUser($name: String!, $email: String!, $password: String!) {
    createUser(data: { name: $name, email: $email, password: $password }) {
      id
    }
  }
`;

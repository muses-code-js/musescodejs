/** @jsx jsx */
import { jsx } from '@emotion/core';
import { useState, useRef } from 'react';

import Router from 'next/router';
import { SEND_ENQUIRY } from '../../graphql/enquiries';
import { useMutation } from '@apollo/react-hooks';

import { colors } from '../../theme';

import FormFields from './FormFields';

const ContactForm = ({ ...props }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('');
  const [message, setMessage] = useState('');
  const form = useRef();
  const cityOptions = [
    'Sydney',
    'Melbourne',
    'Brisbane',
    'Perth',
    'Canberra',
    'Hobart',
    'Wollongong',
  ];
  const [sendEnquiry, {error}] = useMutation(SEND_ENQUIRY, {
    onCompleted: () => {
      Router.push('/contact/thanks');
    },
  });

  const handleChange = e => {
    const name = e.target.name;
    const value = e.target.value;
    name === 'name' ? setName(value) :
    name === 'email' ? setEmail(value) :
    name === 'city' ? setCity(value) : setMessage(value);
  }

  const handleSubmission = e => {
    e.preventDefault();
    const createdAt = new Date();
    sendEnquiry({ variables: { name, email, city, message, createdAt } });
  };

  return (
    <div {...props}>
      <form ref={form} onSubmit={handleSubmission} method="post">
        <FormFields onChange={handleChange} options={cityOptions} />
      </form>
      {error && <p css={{ color: colors.red }}>Message failed to send. Try again, please.</p>}
    </div>
  );
}

export default ContactForm;

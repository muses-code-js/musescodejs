/** @jsx jsx */
import { jsx } from '@emotion/core';
import { useState, useRef } from 'react';
import { SEND_MESSAGE } from '../../graphql/enquiries';
import { useMutation } from '@apollo/react-hooks';
import { colors } from '../../theme';

import FormFields from './FormFields';

const FormContainer = ({ ...props }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('');
  const [message, setMessage] = useState('');
  const [createdAt, setCreatedAt] = useState('');
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
  const [sendMessage, { data, loading, error }] = useMutation(SEND_MESSAGE, {
    onCompleted: () => {
      console.log('success');
    },
    onError: () => {
      console.log('failure');
      console.log(data);
    },
  });

  const handleChange = e => {
    const name = e.target.name;
    const value = e.target.value;
    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'email':
        setEmail(value);
        break;
      case 'city':
        setCity(value);
        break;
      default:
        setMessage(value);
        break;
    }
  };

  const validate = () => {
    return form.current.reportValidity();
  };

  const handleSubmission = e => {
    e.preventDefault();
    if (validate()) {
      setCreatedAt(new Date());
      sendMessage({ variables: {name, email, city, message, createdAt } });
    }
  };

  return (
    <div {...props}>
      <form ref={form} onSubmit={handleSubmission}>
        <FormFields onClick={validate} onChange={handleChange} options={cityOptions} />
      </form>
      {loading && <p css={{ color: colors.purple }}>Sending message... </p>}
      {error && <p css={{ color: colors.red }}>Message failed to send. Try again, please.</p>}
    </div>
  );
};

export default FormContainer;

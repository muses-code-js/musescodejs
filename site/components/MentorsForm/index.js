/** @jsx jsx */
import { jsx } from '@emotion/core';
import { useState } from 'react';

import Router from 'next/router';
import { BECOME_VOLUNTEER } from '../../graphql/volunteers';
import { useMutation } from '@apollo/react-hooks';

import { colors, gridSize, fontSizes } from '../../theme';
import { Input, Label, Select } from '../../primitives/forms';
import { FormFields, Asterisk } from '../ContactForm/FormFields';

const VolunteersForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('');
  const [how, setHow] = useState('');
  const [other, setOther] = useState('');
  const [comment, setComment] = useState('');  

  const cityOptions = [
    'Sydney',
    'Melbourne',
    'Brisbane',
    'Perth',
    'Canberra',
    'Hobart',
    'Wollongong',
  ];
  
  const howOptions = ['Mentorship', 'Organisation', 'Workshop Proposal', 'Other'];

  const [sendEnquiry, { error }] = useMutation(BECOME_VOLUNTEER, {
    onCompleted: () => {
      Router.push('/volunteer/thanks');
    },
  });

  const handleChange = e => {
    const name = e.target.name;
    const value = e.target.value;

    if (name === 'how' && value === 'Other') setOther(true);
    if (name === 'how' && value != 'Other') setOther('');

    name === 'name'
      ? setName(value)
      : name === 'email'
      ? setEmail(value)
      : name === 'city'
      ? setCity(value)
      : name === 'how'
      ? setHow(value)
      : name === 'other'
      ? setOther(value)
      : setComment(value);
  };

  const handleSubmission = e => {
    e.preventDefault();
    sendEnquiry({ variables: { name, email, city, how, other, comment } });
  };

  return (
    <div css={{ maxWidth: 720 }}>
      <p css={pStyle}>
        Thank you for your interest in volunteering with us. If you have no experience at
        mentorship/organisation that is fine, as we're always happy to give opportunities for people
        to contribute to community and develop new skills. Volunteering with us will give you a
        great line in your CV and bunch of new connections.
      </p>
      <div>
        <form onSubmit={handleSubmission} method="post">
          <FormFields
            onChange={handleChange}
            options={cityOptions}
            textArea={false}
            btnText="Submit your application"
          >
            <Label>
              How would you like to help?
              <Asterisk />
            </Label>
            <Select
              type="select"
              name="how"
              onChange={handleChange}
              options={howOptions}
              css={fieldsStyle}
              required
            />
            {other && (
              <Input
                type="text"
                name="other"
                placeholder="Tell us how"
                onChange={handleChange}
                css={fieldsStyle}
              />
            )}
            <Label>Any comment</Label>
            <Input type="text" name="comment" onChange={handleChange} css={fieldsStyle} />
          </FormFields>
        </form>
      </div>

      {error && <p css={{ color: colors.red }}>Application failed to send. Try again, please.</p>}
    </div>
  );
};

const pStyle = {
  fontSize: fontSizes.sm,
  marginTop: gridSize * 5,
  marginBottom: gridSize * 5,
};

const fieldsStyle = {
  marginBottom: gridSize * 2.5,
  width: '100%',
};

export default VolunteersForm;

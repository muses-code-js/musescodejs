/** @jsx jsx */

import Router from 'next/router';
import { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { jsx } from '@emotion/core';
import { Button, Field, Label, Input, Select } from '../primitives/forms';
import { gridSize, colors } from '../theme';
import { CREATE_SPONSOR_REQUEST } from '../graphql/sponsors'

const onChange = handler => e => handler(e.target.value);

const SponsorForm = () => {
  const [company, setCompany] = useState('');
  const [contact, setContact] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('');
  const [sponsor, setSponsor] = useState('');
  const [address, setAddress] = useState('');
  const [capacity, setCapacity] = useState('');
  const [notes, setNotes] = useState('');

  const cityOptions = [
    'Sydney',
    'Melbourne',
    'Brisbane',
    'Perth',
    'Canberra',
    'Hobart',
    'Wollongong',
  ];

  const sponsorOptions = [
    'Host',
    'Food and Drinks',
    'Host and Food/ Drinks',
    'Cover different minor expenses',
  ];

  const [createSponsor, { loading, error }] = useMutation(CREATE_SPONSOR_REQUEST, {
    onCompleted: () => {
       Router.push('/sponsors/thanks')
    }
  });

  const handleSubmission = e => {
    e.preventDefault();
    createSponsor({ variables: {company, contact, email, city, sponsor, address, capacity, notes} });
  };

  return (
    <>
    <form
      css={{ marginTop: gridSize *3 }}
      onSubmit={handleSubmission} 
      method="post"
    >
      <Field>
        <Label htmlFor="company">Company *</Label>
        <Input
          autoFocus
          id="company"
          type="text"
          onChange={onChange(setCompany)}
          placeholder="Company Name"
          minLength="2"
          maxLength="50"
          required
        />
      </Field>
      <Field>
        <Label htmlFor="contact">Contact Person *</Label>
        <Input
          id="contact"
          type="text"
          onChange={onChange(setContact)}
          placeholder="Contact Name"
          maxLength="50"
          required

        />
      </Field>
      <Field>
        <Label htmlFor="email">Email *</Label>
        <Input
          id="email"
          type="text"
          onChange={onChange(setEmail)}
          placeholder="you@awesome.com"
          maxLength="100"
          required
        />
      </Field>
      <Field>
        <Label htmlFor="city">City in which you want to sponsor event *</Label>
        <Select 
          id="city"
          onChange={onChange(setCity)}
          options={cityOptions}
          placeholder="Select the city"
          required
        />
        
      </Field>
      <Field>
        <Label htmlFor="sponsor">Would you prefer to host meetups (see questions below) or sponsor food and drinks for a workshop? *</Label>
        <Select
          id="sponsor"
          onChange={onChange(setSponsor)}
          options={sponsorOptions}
          placeholder="Select a option"
          required
          
        />
      </Field>   

      {/* Questions for Host */}

       { sponsor.includes('Host') && 
       <>
            <Field>
              <Label htmlFor="address">What is your company's address?</Label>
              <Input
                id="address"
                type="text"
                onChange={onChange(setAddress)}
                placeholder="Company Address"
                maxLength="100"
              />
            </Field> 
            <Field>
              <Label htmlFor="capacity">Our non-technical workshops need a projector, seats, and occasionally tables. If you're able to host an event like this, about how many attendees would fit?</Label>
              <Input
                id="capacity"
                onChange={onChange(setCapacity)}
                placeholder="Number of Attendees Capacity"
                type="number"
                maxLength="10"
              />
            </Field>
        </>
        } 
        
        {/* Notes */}

        <Field>
        <Label htmlFor="notes">Anything else?</Label>
        <Input
          id="notes"
          type="text"
          onChange={onChange(setNotes)}
          placeholder="Message"
          maxLength="300"
        />
      </Field> 
        { error ? (
          <p css={{ color: colors.red }}>Something went wrong. Please try again.</p>
        ) : (
          <Button type="submit">Submit</Button>
        )}
    </form>
    </>
  );
};


export default SponsorForm;

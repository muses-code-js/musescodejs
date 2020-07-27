/** @jsx jsx */

import { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { jsx } from '@emotion/core';
import { Button, Field, Label, Input, Select } from '../primitives/forms';
import { gridSize } from '../theme';
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

  const [createSponsorRequest, { loading, error }] = useMutation(CREATE_SPONSOR_REQUEST);

  const handleSubmission = e => {
    e.preventDefault();
    createSponsorRequest({ variables: {company, contact, email, city, sponsor, address, capacity, notes} });
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
          autoComplete="company"
          autoFocus
          id="company"
          onChange={onChange(setCompany)}
          placeholder="Company Name"
          required
          type="text"
        />
      </Field>
      <Field>
        <Label htmlFor="contact">Contact Person *</Label>
        <Input
          autoComplete="contact"
          id="contact"
          onChange={onChange(setContact)}
          placeholder="Contact Name"
          required
          type="text"
        />
      </Field>
      <Field>
        <Label htmlFor="email">Email *</Label>
        <Input
          autoComplete="email"
          id="email"
          onChange={onChange(setEmail)}
          placeholder="you@awesome.com"
          required
          type="text"
        />
      </Field>
      <Field>
        <Label htmlFor="city">City in which you want to sponsor event *</Label>
        <Select 
          id="city"
          onChange={onChange(setCity)}
          options={cityOptions}
        />
        
      </Field>
      <Field>
        <Label htmlFor="sponsor">Would you prefer to host meetups (see questions below) or sponsor food and drinks for a workshop? *</Label>
        <Select
          id="sponsor"
          onChange={onChange(setSponsor)}
          options={sponsorOptions}
          
        />
      </Field>   

      {/* Questions for Host */}

       { sponsor.includes('Host') && 
       <>
            <Field>
              <Label htmlFor="address">What is your company's address?</Label>
              <Input
                autoComplete="address"
                id="address"
                onChange={onChange(setAddress)}
                placeholder="Company Address"
                type="text"
                
              />
            </Field> 
            <Field>
              <Label htmlFor="capacity">Our non-technical workshops need a projector, seats, and occasionally tables. If you're able to host an event like this, about how many attendees would fit?</Label>
              <Input
                autoComplete="capacity"
                id="capacity"
                onChange={onChange(setCapacity)}
                placeholder="Attendees Capacity"
                type="text"
              />
            </Field>
        </>
        } 
        
        {/* Notes */}

        <Field>
        <Label htmlFor="notes">Anything else?</Label>
        <Input
          autoComplete="notes"
          id="notes"
          onChange={onChange(setNotes)}
          placeholder="Message"
          type="text"
          value={notes}
        />
      </Field> 
      {loading ? (
          <Button disabled>Submitting request...</Button>
        ) : (
          <Button type="submit">Submit</Button>
        )}
    </form>
    </>
  );
}

export default SponsorForm;
